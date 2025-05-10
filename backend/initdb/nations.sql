CREATE TABLE nations(
  id SERIAL PRIMARY KEY,
--  three letters code
  nation VARCHAR(3) UNIQUE NOT NULL
);