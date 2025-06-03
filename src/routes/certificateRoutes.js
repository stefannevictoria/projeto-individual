const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.get('/', certificateController.index);

router.get('/:id', certificateController.find);

module.exports = router;
