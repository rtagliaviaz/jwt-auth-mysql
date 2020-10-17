CREATE DATABASE database_jwt_auth;

USE database_jwt_auth;

--user table
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE users
  MODIFY username VARCHAR(16) NOT NULL UNIQUE;

DESCRIBE users;

--favorite movies
CREATE TABLE movies(
id INT(11) NOT NULL,
title VARCHAR(150) NOT NULL,
category VARCHAR(150) NOT NULL,
user_id INT(11),
created_at timestamp NOT NULL DEFAULT current_timestamp,
CONSTRAINT fk_user_income FOREIGN KEY (user_id) REFERENCES users(id)
);


ALTER TABLE movies
  ADD PRIMARY KEY (id);

ALTER TABLE movies
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE movies;
