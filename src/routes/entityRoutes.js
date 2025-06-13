const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

function verificarAutenticacao(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/api/entidades', verificarAutenticacao, async (req, res) => {
  try {
    const entityService = require('../services/entityService');
    const entities = await entityService.getAllEntities();
    res.json(entities);
  } catch (error) {
    console.error('Erro ao buscar entidades:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/api/entidades/vinculadas', verificarAutenticacao, async (req, res) => {
  try {
    const entityUserService = require('../services/entityUserService');
    const entities = await entityUserService.getUserEntities(req.session.user.id);
    res.json(entities);
  } catch (error) {
    console.error('Erro ao buscar entidades vinculadas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.post('/api/entidades/vincular', verificarAutenticacao, async (req, res) => {
  try {
    const entityUserService = require('../services/entityUserService');
    const { entidade_id, cargo } = req.body;
    
    await entityUserService.createEntityUser({
      usuario_id: req.session.user.id,
      entidade_id: entidade_id,
      cargo: cargo
    });
    
    res.json({ message: 'Vinculação realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao vincular à entidade:', error);
    res.status(500).json({ message: 'Erro ao vincular à entidade' });
  }
});

router.delete('/api/entidades/desvincular/:id', verificarAutenticacao, async (req, res) => {
  try {
    const entityUserService = require('../services/entityUserService');
    const entityId = req.params.id;
    const userId = req.session.user.id;
    
    await entityUserService.deleteEntityUser(userId, entityId);
    
    res.json({ message: 'Desvinculação realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao desvincular da entidade:', error);
    res.status(500).json({ message: 'Erro ao desvincular da entidade' });
  }
});

router.get('/', entityController.index);

router.get('/:id', entityController.find);

module.exports = router;
