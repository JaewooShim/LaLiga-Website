import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from io import StringIO
import psycopg
import os

# testing on my local machine
conn = psycopg.connect(
    host="localhost",
    dbname=os.environ['DB_NAME'],
    user=os.environ['DB_NAME'],
    password=os.environ['DB_PASSWORD'],
    port=5433
)

cur = conn.cursor()

url = "https://fbref.com/en/comps/12/La-Liga-Stats"
page = requests.get(url)
all_teams = []
columns = [('Performance', 'Gls'),
           ('Performance', 'Ast'), ('Performance', 'PK'),
           ('Performance', 'CrdY'), ('Performance', 'CrdR'),
           ('Expected', 'xG'), ('Expected', 'xAG')]

soup = BeautifulSoup(page.text, 'lxml')
# only want the first table
overall_table = soup.find('table', class_='stats_table')

# only want the squads links
links = [f"https://fbref.com{link.get('href')}" for link in
         overall_table.find_all('a') if '/squads/' in link.get('href')]


for link in links[1:]:
    details = requests.get(link)
    soup = BeautifulSoup(details.text, 'lxml')
    players = soup.find('table', class_='stats_table')
    data = pd.read_html(StringIO(str(players)))[0]
    data = data[:-2]  # don't want the table footer

    # keep the first 5 columns and columns specified above
    data = pd.concat([data.iloc[:, :5], data[columns]], axis=1)
    # formatting the columns headers
    if data is not None and data.columns is not None:
        data.columns = data.columns.droplevel()

    # only keep the year part
    data['Age'] = data['Age'].apply(
        lambda age: age.split('-')[0] if isinstance(age, str) else None)
    # nan -> None
    data['Nation'] = data['Nation'].where(pd.notna(data['Nation']), None)
    data['Pos'] = data['Pos'].where(pd.notna(data['Pos']), None)

    # extracting the team name from the url
    team_name = link.split('/')[-1].replace("-Stats", "").replace("-", " ")

    data['Team'] = team_name

    all_teams.append(data)
    for _, row in data.iterrows():
        cur.execute("""
            INSERT INTO player_data (player_name, nation, positions, age, matches_played,
            goals, assists, penalty_goals, yellow_card, red_card, expected_goals, expected_assists, team_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (row['Player'], row['Nation'], row['Pos'], row['Age'],
              row['MP'], row['Gls'], row['Ast'], row['PK'], row['CrdY'],
              row['CrdR'], row['xG'], row['xAG'], row['Team']))

    # delaying each loop by 5 secs to avoid getting blocked from scrapping
    time.sleep(5)

conn.commit()
cur.close()
conn.close()
print("data inserted")

# all_teams_df = pd.concat(all_teams)
# all_teams_df.to_csv('/Users/jaewooshim/Downloads/stats.csv', index=False)


