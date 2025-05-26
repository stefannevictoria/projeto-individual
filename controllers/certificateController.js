const certificateService = require('../services/certificateService');

module.exports = {
  async index(req, res) {
    try {
      const certificate = await certificateService.findAll();
      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const certificate = await certificateService.findById(id);
      res.status(200).json(certificate);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

};
