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
      const userId = req.session.user.id;
      const entidades = await entityService.findByUserId(userId);
      const entidadesIds = entidades.map(e => e.id);

      const { nome, descricao, data, local, duracao_horas, entidade_id } = req.body;

      if (!entidadesIds.includes(parseInt(entidade_id))) {
        return res.status(403).send("Você não pode criar eventos para esta entidade");
      }

      const eventData = { nome, descricao, data, local, duracao_horas, entidade_id };
      await eventService.create(eventData);

      res.redirect('/eventos/meus-eventos');
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(400).send("Erro ao criar evento");
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
      const entidades = await entityService.findByUserId(req.session.user.id);
      res.render('newEvent', { entidades, user: req.session.user });
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
