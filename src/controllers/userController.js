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
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).render('register', {
          erro: 'Nome, email e senha são obrigatórios.'
        });
      }

      const senha_hash = await bcrypt.hash(senha, 10);
      const newUser = await userService.create({ nome, email, senha_hash });

      res.redirect('/login');

    } catch (error) {
      console.error("Erro no cadastro:", error.message);
      res.status(500).render('register', {
        erro: 'Erro ao cadastrar usuário.'
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.session.user;
      const { nome, email, senha } = req.body;

      const updateData = { nome, email };

      if (senha && senha.trim() !== "") {
        const senha_hash = await bcrypt.hash(senha, 10);
        updateData.senha_hash = senha_hash;
      }

      const updatedUser = await userService.update(id, updateData);

      req.session.user = {
        id: updatedUser.id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        senha_hash: updateData.senha_hash || req.session.user.senha_hash
      };

      res.redirect('/usuarios/perfil');

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
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

      const senhaCorreta = usuario && await bcrypt.compare(senha, usuario.senha_hash);

      if (!usuario || !senhaCorreta) {
        return res.status(401).render('login', { erro: 'Email ou senha incorretos' });
      }

      req.session.user = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      res.redirect('/dashboard');

    } catch (error) {
      console.error('Erro no login:', error.message);
      return res.status(500).render('login', { erro: 'Erro interno no servidor' });
    }
  },

  async profile(req, res) {
    try {
      const { id } = req.session.user;
      const usuario = await userService.findById(id);
      res.render('perfil', { usuario });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

};
