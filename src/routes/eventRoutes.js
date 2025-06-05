const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/novo', eventController.newForm); 
router.post('/', eventController.create);
router.get('/:id', eventController.find);
router.get('/', eventController.index);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.delete);

module.exports = router;
