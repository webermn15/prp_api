CREATE DATABASE prp_dev;

\c prp_dev

CREATE TYPE scope AS ENUM ('international', 'national', 'regional', 'local');

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	username TEXT NOT NULL
);

CREATE TABLE regions(
	region_id SERIAL PRIMARY KEY,
	region_name TEXT NOT NULL,
	region_alias TEXT NOT NULL,
	level scope NOT NULL,
	region_image BYTEA
);

CREATE TABLE games(
	game_id SERIAL PRIMARY KEY,
	game_name TEXT NOT NULL,
	game_alias TEXT NOT NULL,
	CONSTRAINT unique_alias UNIQUE (game_alias)
);

CREATE TABLE game_characters(
	game_characters_id SERIAL PRIMARY KEY,
	character_game TEXT NOT NULL REFERENCES games(game_alias),
	character_name TEXT NOT NULL,
	character_image TEXT NOT NULL
);

CREATE TABLE rankings(
	ranking_id SERIAL PRIMARY KEY,
	ranking_game TEXT NOT NULL REFERENCES games(game_alias),
	ranking_region INT NOT NULL REFERENCES regions(region_id),
	last_ranking INT REFERENCES rankings(ranking_id),
	published DATE NOT NULL,
	ranking_title TEXT NOT NULL,
	ranking_detail TEXT,
	ranking_image BYTEA	
);

CREATE TABLE players(
	player_id SERIAL PRIMARY KEY,
	site_user INT REFERENCES users(user_id),
	player_tag TEXT NOT NULL,
	sponsor_prefix TEXT
);

CREATE TABLE player_rankings(
	player_ranking_id SERIAL PRIMARY KEY,
	player INT NOT NULL REFERENCES players(player_id),
	ranking INT NOT NULL REFERENCES rankings(ranking_id),
	rank INT NOT NULL,
	previous_rank INT
);

CREATE TABLE player_ranking_characters(
	prc_id SERIAL PRIMARY KEY,
	player_ranking INT NOT NULL REFERENCES player_rankings(player_ranking_id),
	player_ranking_game TEXT NOT NULL REFERENCES games(game_alias),
	character_played INT NOT NULL REFERENCES game_characters(game_characters_id),
	main BOOLEAN NOT NULL
);


