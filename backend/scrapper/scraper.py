import pandas as pd
import time
import requests
from bs4 import BeautifulSoup
import psycopg2
import os
from io import StringIO
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")


SELENIUM_URL = "http://selenium:4444/wd/hub/status"

# Wait for Selenium to be ready
for _ in range(30):
    try:
        response = requests.get(SELENIUM_URL)
        if response.status_code == 200 and response.json().get("value", {}).get("ready", False):
            break  # now that selenium is ready
    except requests.exceptions.ConnectionError:
        pass  # keep trying to connect
    time.sleep(1)
else:
    raise RuntimeError("Selenium server not ready after waiting.")


driver = webdriver.Remote(
    command_executor="http://selenium:4444/wd/hub",
    options=options
)

url = "https://fbref.com/en/comps/12/La-Liga-Stats"

columns = [('Performance', 'Gls'),
          ('Performance', 'Ast'), ('Performance', 'PK'),
          ('Performance', 'CrdY'), ('Performance', 'CrdR'),
          ('Expected', 'xG'), ('Expected', 'xAG')]

# connect to the db
conn = psycopg2.connect(
    host=os.environ['DB_HOST'],
    dbname=os.environ['DB_NAME'],
    user=os.environ['DB_USER'],
    password=os.environ['DB_PASSWORD'],
    port=os.environ['DB_PORT']
)

cur = conn.cursor()

url = "https://fbref.com/en/comps/12/La-Liga-Stats"

driver.get(url)

# ensures the table is present in the DOM
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'stats_table'))
    )
except TimeoutException:
    raise RuntimeError('Timed out waiting for the table to load')

# only want the first table
soup = BeautifulSoup(driver.page_source, 'lxml')
overall_table = soup.find('table', 'stats_table')

# extract urls for the squads stats
links = [f'https://fbref.com{link.get("href")}'for link in
         overall_table.find_all('a') if '/squads/' in link.get('href')]

teams = []
nations = set()

for link in links:
    team_name = link.split('/')[-1].replace('-Stats', '').replace('-', ' ')

    driver.get(link)
    try:
        # here again wait for the table to be present in the DOM
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'stats_table'))
        )
    except TimeoutException:
        continue  #skip this team

    soup = BeautifulSoup(driver.page_source, 'lxml')

    # want the first table as well
    players_stats = soup.find('table', class_='stats_table')

    data = pd.read_html(StringIO(str(players_stats)))[0]
    data = data[:-2]  # remove the footer rows

    data = pd.concat([data.iloc[:, :5], data[columns]], axis=1)

    if data is not None and data.columns is not None:
        data.columns = data.columns.droplevel()

    # remove invalid rows
    data.dropna(subset=['Player'], inplace=True)
    data = data[data['Player'] != 'Player']

    # only keep the year part
    data['Age'] = data['Age'].apply(
        lambda age: age.split('-')[0] if isinstance(age, str) else None)
    # replace nan -> None
    data['Nation'] = data['Nation'].where(pd.notna(data['Nation']), None)
    data['Pos'] = data['Pos'].where(pd.notna(data['Pos']), None)

    # add team name column
    data['Team'] = team_name

    teams.append(team_name)
    nations.update(data['Nation'])

    for _, row in data.iterrows():
        try:
            cur.execute("""
                INSERT INTO player_data (player_name, nation, positions, age, matches_played,
                goals, assists, penalty_goals, yellow_card, red_card, expected_goals, expected_assists, team_name)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (row['Player'], row['Nation'], row['Pos'], row['Age'],
                  row['MP'], row['Gls'], row['Ast'], row['PK'], row['CrdY'],
                  row['CrdR'], row['xG'], row['xAG'], row['Team']))
            conn.commit()
        except Exception as e:
            conn.rollback()

    # delaying each loop by 5 secs to avoid getting blocked from scrapping
    time.sleep(5)

# insert every team into teams table
for team in teams:
    try:
        cur.execute("""
            INSERT INTO teams (team_name)
            VALUES (%s)
        """, (team,))
        conn.commit()
    except Exception as e:
        conn.rollback()

# insert all nations into nations table
for nation in nations:
    print(nation)
    print(type(nation))
    try:
        cur.execute("""
            INSERT INTO nations (nation)
            VALUES (%s)
        """, (nation,))
        conn.commit()
    except Exception as e:
        conn.rollback()

cur.close()
conn.close()
print("data inserted.")
driver.quit()