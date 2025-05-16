CREATE TABLE player_data(
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(50),
    nation VARCHAR(3),
    positions VARCHAR(10),
    age INTEGER,
    matches_played INTEGER,
    goals FLOAT,
    assists FLOAT,
    penalty_goals FLOAT,
    yellow_card FLOAT,
    red_card FLOAT,
    expected_goals FLOAT,
    expected_assists FLOAT,
    team_name VARCHAR(20)
);

CREATE EXTENSION pg_trgm;
CREATE INDEX gin_name_idx ON player_data USING gin (player_name gin_trgm_ops);
