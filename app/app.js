const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware Parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi Session
app.use(session({
    secret: 'rahasia-kelompok-e3-super-aman', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // Login valid selama 1 jam
}));

// Middleware Global User (agar data user bisa dibaca di semua file EJS)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`VirtualDiary E3 Running on Port ${PORT}`);
});