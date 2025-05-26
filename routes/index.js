const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Rota principal funcionando!');
});

const userRoutes = require("./userRoutes");
router.use("/usuarios", userRoutes);

const entityRoutes = require("./entityRoutes");
router.use("/entidades", entityRoutes);

const eventRoutes = require("./eventRoutes");
router.use("/eventos", eventRoutes);

const registrationRoutes = require("./registrationRoutes");
router.use("/inscricoes", registrationRoutes);

module.exports = router;