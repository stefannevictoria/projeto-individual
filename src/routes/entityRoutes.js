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
    const entities = await entityService.findAll();
    res.json(entities);
  } catch (error) {
    console.error('Erro ao buscar entidades:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/api/entidades/vinculadas', verificarAutenticacao, async (req, res) => {
  try {
    const entityUserService = require('../services/entityUserService');
    const entities = await entityUserService.findByUserId(req.session.user.id);
    res.json(entities);
  } catch (error) {
    console.error('Erro ao buscar entidades vinculadas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.post('/api/entidades/vincular', verificarAutenticacao, async (req, res) => {
  try {
    const entityUserService = require('../services/entityUserService');
    const { entidade_id, papel } = req.body;
    
    await entityUserService.create({
      usuario_id: req.session.user.id,
      entidade_id: entidade_id,
      papel: papel
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
    
    await entityUserService.delete(userId, entityId);
    
    res.json({ message: 'Desvinculação realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao desvincular da entidade:', error);
    res.status(500).json({ message: 'Erro ao desvincular da entidade' });
  }
});

router.get('/', entityController.index);

router.get('/:id', entityController.find);

module.exports = router;
