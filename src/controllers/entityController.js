const entityService = require('../services/entityService');

module.exports = {
  async index(req, res) {
    try {
      const entity = await entityService.findAll();
      res.status(200).json(entity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const event = await entityService.findById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

};
