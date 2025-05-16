CREATE TABLE nations(
  id SERIAL PRIMARY KEY,
--  country code
  nation VARCHAR(3) UNIQUE NOT NULL
);