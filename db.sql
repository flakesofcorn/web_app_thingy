CREATE DATABASE IF NOT EXISTS my_database;

USE my_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL, 
    admin BOOL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE USER 'wadb_user'@'localhost' IDENTIFIED BY 'asd321';
GRANT ALL PRIVILEGES ON my_database.* TO 'wadb_user'@'localhost';
FLUSH PRIVILEGES;
