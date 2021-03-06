CREATE SCHEMA IF NOT EXISTS logindb;
USE logindb;

DROP TABLE IF EXISTS tb_user;
CREATE TABLE UserModel (
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    pass_hash TEXT,
    CONSTRAINT UC_Login_User UNIQUE (user_name)
);

SELECT * FROM user_model;


