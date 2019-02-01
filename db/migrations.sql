CREATE DATABASE prp_dev;

\c prp_dev

CREATE TYPE scope AS ENUM ('international', 'national', 'regional', 'local');

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL
);

CREATE TABLE regions(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	level scope NOT NULL,
	image BYTEA
);

CREATE TABLE games(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	alias TEXT NOT NULL
);

CREATE TABLE rankings(
	id SERIAL PRIMARY KEY,
	game INT NOT NULL REFERENCES games(id),
	region INT NOT NULL REFERENCES regions(id),
	last_ranking INT REFERENCES rankings(id),
	released DATE NOT NULL,
	detail TEXT,
	image BYTEA	
);

CREATE TABLE players(
	id SERIAL PRIMARY KEY,
	site_user INT REFERENCES users(id),
	tag TEXT NOT NULL,
	sponsor_prefix TEXT
);

CREATE TABLE player_rankings(
	id SERIAL PRIMARY KEY,
	player INT NOT NULL REFERENCES players(id),
	ranking INT NOT NULL REFERENCES rankings(id),
	rank INT NOT NULL
);