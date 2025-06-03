const entityUserService = require("../services/entityUserService");

module.exports = {
  async index(req, res) {
    try {
      const entityUsers = await entityUserService.findAll();
      res.status(200).json(entityUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const entityUser = await entityUserService.findById(id);
      res.status(200).json(entityUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const entityUserData = req.body;
      const newEntityUser = await entityUserService.create(entityUserData);
      res.status(201).json(newEntityUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const entityUserData = req.body;
      const updatedEntityUser = await entityUserService.update(
        id,
        entityUserData
      );
      res.status(200).json(updatedEntityUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await entityUserService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
