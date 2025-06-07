const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const landingController = require('../controllers/landingController');


router.get('/', async (req, res) => {
  res.render('landingPage');
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

router.get('/sobre-nos', landingController.getSobreNos);

module.exports = router;