CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(20) UNIQUE NOT NULL
);