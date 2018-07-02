-- create Pokemon table in database
CREATE TABLE IF NOT EXISTS poke (
  id SERIAL PRIMARY KEY,
  num varchar(255),
  name varchar(255),
  img varchar(255),
  weight varchar(255),
  height varchar(255)
);

-- create users table in database
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	first_name varchar(255),
	last_name varchar(255)
);

-- add user_id column to poke table
ALTER TABLE poke
ADD IF NOT EXISTS user_id integer;

-- add email and password to users table
ALTER TABLE users
ADD IF NOT EXISTS email varchar(255),
ADD IF NOT EXISTS password varchar(255);

-- add types table
CREATE TABLE IF NOT EXISTS types (
	id SERIAL PRIMARY KEY,
	type varchar(255)
);

-- add pokemon-types table
CREATE TABLE IF NOT EXISTS pokemon_types (
	id SERIAL PRIMARY KEY,
	poke_id integer,
	name varchar(255),
	types_id varchar(255),
	type varchar(255)
);