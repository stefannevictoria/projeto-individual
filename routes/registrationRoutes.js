const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.index);

router.get('/:id', registrationController.find);

router.post('/', registrationController.create);

router.delete('/:id', registrationController.delete);

module.exports = router;
