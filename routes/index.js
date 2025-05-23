const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Rota principal funcionando!');
});

const eventRoutes = require("./eventRoutes");
router.use("/eventos", eventRoutes);

module.exports = router;