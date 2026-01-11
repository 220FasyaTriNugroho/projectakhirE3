const express = require('express');
const router = express.Router();
const db = require('../config/database');

// --- (R) READ: HALAMAN UTAMA (BUKU) ---
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
        res.status(500).send("Error: " + err.message);
    }
});

// --- AUTHENTICATION ROUTES ---

// 1. Halaman Login (GET)
router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login'); // Akan membuka view/login.ejs
});

// Proses Login (POST)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [users] = await db.query('SELECT * FROM authors WHERE username = ? AND password = ?', [username, password]);
    
    if (users.length > 0) {
        req.session.user = users[0];
        res.redirect('/');
    } else {
        // Bisa ditambahkan error handling lebih bagus nanti
        res.send(`<script>alert('Login Gagal!'); window.location='/login';</script>`);
    }
});

// 2. Halaman Register (GET)
router.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('register'); // Akan membuka view/register.ejs
});

// Proses Register (POST)
router.post('/register', async (req, res) => {
    const { nickname, username, password } = req.body;
    try {
        await db.query('INSERT INTO authors (nickname, username, password) VALUES (?, ?, ?)', 
            [nickname, username, password]);
        res.redirect('/login');
    } catch (err) {
        res.send(`<script>alert('Username sudah dipakai!'); window.location='/register';</script>`);
    }
});

// Logout (POST)
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// --- CRUD ROUTES ---

// 3. Halaman Tambah Cerita (GET)
router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('create'); // Akan membuka view/create.ejs
});

// Proses Tambah (POST)
router.post('/add', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const { content, style } = req.body;
    await db.query('INSERT INTO diary_pages (author_id, content, page_style) VALUES (?, ?, ?)', 
        [req.session.user.id, content, style]);
    res.redirect('/');
});

// 4. Halaman Edit (GET)
router.get('/edit/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    
    const pageId = req.params.id;
    const [page] = await db.query('SELECT * FROM diary_pages WHERE id = ?', [pageId]);

    // Validasi: Cek kepemilikan
    if (page.length === 0 || page[0].author_id !== req.session.user.id) {
        return res.redirect('/');
    }

    res.render('edit', { page: page[0] }); // Akan membuka view/edit.ejs
});

// Proses Update (POST)
router.post('/update/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const pageId = req.params.id;
    const { content } = req.body;
    
    // Validasi double check
    const [page] = await db.query('SELECT * FROM diary_pages WHERE id = ?', [pageId]);
    if (page.length > 0 && page[0].author_id === req.session.user.id) {
        await db.query('UPDATE diary_pages SET content = ? WHERE id = ?', [content, pageId]);
    }
    res.redirect('/');
});

// Proses Delete (POST)
router.post('/delete/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const pageId = req.params.id;
    
    const [page] = await db.query('SELECT * FROM diary_pages WHERE id = ?', [pageId]);
    if (page.length > 0 && page[0].author_id === req.session.user.id) {
        await db.query('DELETE FROM diary_pages WHERE id = ?', [pageId]);
    }
    res.redirect('/');
});

module.exports = router;