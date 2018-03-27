CREATE SCHEMA IF NOT EXISTS login;

CREATE TABLE login.tb_user (
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    pass_hash VARCHAR(200)
);

use login;

SELECT * FROM tb_user;


