CREATE DATABASE prp_dev;

\c prp_dev

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	password_digest TEXT NOT NULL
);