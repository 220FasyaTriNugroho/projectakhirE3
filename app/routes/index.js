const express = require('express');
const router = express.Router();
const db = require('../config/database');

// (R) READ: Tampilkan Halaman
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, a.nickname 
            FROM diary_pages p 
            JOIN authors a ON p.author_id = a.id 
            ORDER BY p.created_at ASC
        `);
        res.render('index', { pages: rows });
    } catch (err) {
        res.status(500).send("Error Database: " + err.message);
    }
});

// --- AUTHENTICATION ---

// Register
router.post('/register', async (req, res) => {
    const { nickname, username, password } = req.body;
    try {
        await db.query('INSERT INTO authors (nickname, username, password) VALUES (?, ?, ?)', 
            [nickname, username, password]);
        // Auto login setelah register (opsional), di sini kita redirect aja
        res.redirect('/');
    } catch (err) {
        res.send(`<script>alert('Gagal daftar! Username mungkin sudah dipakai.'); window.location='/';</script>`);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [users] = await db.query('SELECT * FROM authors WHERE username = ? AND password = ?', [username, password]);
    
    if (users.length > 0) {
        req.session.user = users[0];
        res.redirect('/');
    } else {
        res.send(`<script>alert('Username atau Password salah!'); window.location='/';</script>`);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// --- CRUD FEATURE ---

// (C) CREATE: Tambah Halaman
router.post('/add', async (req, res) => {
    if (!req.session.user) return res.status(403).send("Harus Login!");
    
    const { content, style } = req.body;
    await db.query('INSERT INTO diary_pages (author_id, content, page_style) VALUES (?, ?, ?)', 
        [req.session.user.id, content, style]);
    res.redirect('/');
});

// (U) UPDATE: Edit Halaman
router.post('/update/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/');

    const pageId = req.params.id;
    const newContent = req.body.content;
    const userId = req.session.user.id;

    // Cek apakah halaman ini milik user yang sedang login
    const [page] = await db.query('SELECT * FROM diary_pages WHERE id = ?', [pageId]);
    
    if (page.length > 0 && page[0].author_id === userId) {
        await db.query('UPDATE diary_pages SET content = ? WHERE id = ?', [newContent, pageId]);
    }
    res.redirect('/');
});

// (D) DELETE: Hapus Halaman
router.post('/delete/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/');

    const pageId = req.params.id;
    const userId = req.session.user.id;

    const [page] = await db.query('SELECT * FROM diary_pages WHERE id = ?', [pageId]);
    
    if (page.length > 0 && page[0].author_id === userId) {
        await db.query('DELETE FROM diary_pages WHERE id = ?', [pageId]);
    }
    res.redirect('/');
});

module.exports = router;