const userService = require('../services/userService');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    try {
      const user = await userService.findAll();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const userData = req.body;
      const newUser = await userService.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await userService.update(id, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await userService.findByEmail(email);

      if (usuario && await bcrypt.compare(senha, usuario.senha_hash)) {
        req.session.user = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        };
        console.log('Usuário logado com sucesso:', req.session.user);
        res.redirect('/eventos');
      } else {
        res.status(401).send('Email ou senha inválidos!');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};
