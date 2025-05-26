const registrationService = require('../services/registrationService');

module.exports = {
  async index(req, res) {
    try {
      const registrations = await registrationService.findAll();
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const registration = await registrationService.findById(id);
      res.status(200).json(registration);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const registrationData = req.body;
      const newRegistration = await registrationService.create(registrationData);
      res.status(201).json(newRegistration);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
      try {
        const { id } = req.params;
        const registrationData = req.body;
        const updatedRegistration = await registrationService.update(id, registrationData);
        res.status(200).json(updatedRegistration);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await registrationService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
