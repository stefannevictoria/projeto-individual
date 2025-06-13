const express = require('express');
const router = express.Router();

function verificarAutenticacao(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

const landingPageRoutes = require("./landingPageRoutes");
router.use("/", landingPageRoutes);

const userRoutes = require("./userRoutes");
router.use("/usuarios", userRoutes);

const entityRoutes = require("./entityRoutes");
router.use("/entidades", entityRoutes);

const eventRoutes = require("./eventRoutes");
router.use("/eventos", eventRoutes);

router.get('/eventos', verificarAutenticacao, (req, res) => {
  res.render('eventos', { usuario: req.session.user });
});

const registrationRoutes = require("./registrationRoutes");
router.use("/inscricoes", registrationRoutes);

const certificateRoutes = require("./certificateRoutes");
router.use("/certificados", certificateRoutes);

router.use('/sobre-nos', landingPageRoutes);

router.get('/dashboard', verificarAutenticacao, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;