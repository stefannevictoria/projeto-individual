const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');


router.get('/', async (req, res) => {
  res.render('landingPage');
});

router.get('/login', (req, res) => {
  res.render('login'); // Renderiza login.ejs
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
});

router.get('/cadastro', async (req, res) => {
  try {
    const entidades = await entityService.findAll();
    res.render('register', { entidades });
  } catch (error) {
    console.error("Erro ao carregar entidades:", error.message);
    res.status(500).send("Erro ao carregar a página de cadastro");
  }

});

module.exports = router;