const eventService = require('../services/eventService');
const entityService = require('../services/entityService');

module.exports = {
  async index(req, res) {
    try {
      const eventos = await eventService.findAll();
      res.render('event', {
        eventos,
        user: req.session.user
      });
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      res.status(500).send("Erro ao carregar eventos");
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const event = await eventService.findById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const eventData = req.body;
      const newEvent = await eventService.create(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const eventData = req.body;
      const updatedEvent = await eventService.update(id, eventData);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await eventService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async newForm(req, res) {
    try {
      const entidades = await entityService.findAll();
      res.render('newEvent', { entidades });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar formulário de novo evento' });
    }
  },

  async meusEventos(req, res) {
    try {
      const eventos = await eventService.getEventsByOrganizer(req.session.user.id);
      res.render('myEvents', {
        eventos,
        user: req.session.user
      });
    } catch (error) {
      console.error("Erro ao carregar eventos do usuário:", error);
      res.status(500).send("Erro ao carregar seus eventos");
    }
  }
};
