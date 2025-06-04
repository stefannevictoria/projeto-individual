const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');


router.get('/', async (req, res) => {
  res.render('landingPage');
});

module.exports = router;