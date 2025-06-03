const eventService = require('../services/eventService');

module.exports = {
  async index(req, res) {
    try {
      const events = await eventService.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
  }
};
