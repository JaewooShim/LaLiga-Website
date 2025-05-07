CREATE TABLE player_data(
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100),
    nation VARCHAR(50),
    positions VARCHAR(50),
    age INTEGER,
    matches_played INTEGER,
    goals FLOAT,
    assists FLOAT,
    penalty_goals FLOAT,
    yellow_card FLOAT,
    red_card FLOAT,
    expected_goals FLOAT,
    expected_assists FLOAT,
    team_name VARCHAR(100)
);