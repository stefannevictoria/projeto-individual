const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

router.get('/', entityController.index);

router.get('/:id', entityController.find);

module.exports = router;
