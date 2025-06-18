const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const landingController = require('../controllers/landingController');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
  try {
    let user = null;

    if (req.session.user && req.session.user.id) {
      user = await userService.findById(req.session.user.id);
    }

    res.render('landingPage', { user });
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.render('landingPage', { user: null });
  }
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