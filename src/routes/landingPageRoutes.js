const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('landingPage');
});

router.get('/login', (req, res) => {
  res.render('login'); // Renderiza login.ejs
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
});

module.exports = router;