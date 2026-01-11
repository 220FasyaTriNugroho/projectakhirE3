-- INIT DATABASE : VirtualDiary

CREATE DATABASE IF NOT EXISTS virtualdiary_db;
USE virtualdiary_db;

-- TABLE users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE diary_pages
CREATE TABLE diary_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    page_style ENUM('classic', 'dark', 'pastel') DEFAULT 'classic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_user_diary
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- DUMMY DATA
INSERT INTO users (username, password, nickname) VALUES
('admin', 'admin123', 'Admin'),
('akmal', 'akmal123', 'Akmal');

INSERT INTO diary_pages (user_id, content, page_style) VALUES
(1, 'Selamat datang di VirtualDiary', 'classic'),
(2, 'Diary pertamaku', 'pastel');
