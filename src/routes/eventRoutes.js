const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

function verificarAutenticacao(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/api/eventos', verificarAutenticacao, async (req, res) => {
  try {
    const eventService = require('../services/eventService');
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/api/eventos/inscritos', verificarAutenticacao, async (req, res) => {
  try {
    const registrationService = require('../services/registrationService');
    const events = await registrationService.getUserRegistrations(req.session.user.id);
    res.json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos inscritos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/api/eventos/meus', verificarAutenticacao, async (req, res) => {
  try {
    const eventService = require('../services/eventService');
    const events = await eventService.getEventsByOrganizer(req.session.user.id);
    res.json(events);
  } catch (error) {
    console.error('Erro ao buscar meus eventos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.post('/api/eventos/:id/inscrever', verificarAutenticacao, async (req, res) => {
  try {
    const registrationService = require('../services/registrationService');
    const eventId = req.params.id;
    const userId = req.session.user.id;
    
    await registrationService.createRegistration({
      usuario_id: userId,
      evento_id: eventId
    });
    
    res.json({ message: 'Inscrição realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao se inscrever no evento:', error);
    res.status(500).json({ message: 'Erro ao se inscrever no evento' });
  }
});

router.get('/novo', eventController.newForm); 
router.post('/', eventController.create);
router.get('/:id', eventController.find);
router.get('/', eventController.index);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.delete);

module.exports = router;
