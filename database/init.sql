CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diary_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    content TEXT NOT NULL,
    page_style ENUM('classic', 'midnight', 'lavender') DEFAULT 'classic', -- 3 Tema Kertas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Data Awal (Opsional untuk Testing)
INSERT INTO authors (nickname, username, password) VALUES ('Akmal', 'akmal', 'akmal123');
INSERT INTO diary_pages (author_id, content, page_style) VALUES (1, 'Diary Pertamaku', 'midnight');