const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);

router.get('/:id', userController.find);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;
