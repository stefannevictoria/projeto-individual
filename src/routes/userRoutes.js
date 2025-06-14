const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

function verificarAutenticacao(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/perfil', verificarAutenticacao, userController.profile);

router.post('/perfil', verificarAutenticacao, userController.update);

router.get('/', userController.index);
router.get('/:id', userController.find);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.get('/cadastro', async (req, res) => {
  const entidadeService = require('../services/entityService');
  const entidades = await entidadeService.findAll();
  res.render('register', { entidades });
});

router.post('/cadastro', async (req, res) => {
  const bcrypt = require('bcrypt');
  const userService = require('../services/userService');
  const entityUserService = require('../services/entityUserService');

  try {
    const { nome, email, senha } = req.body;
    const senha_hash = await bcrypt.hash(senha, 10);

    console.log("Tentando criar usuário:", nome, email);
    const newUser = await userService.create({ nome, email, senha_hash });
    console.log("Usuário criado:", newUser);

    console.log("Relação entidade-usuário criada com sucesso");
    res.redirect('/login');
  } catch (error) {
    console.error("Erro detalhado:", error);
    res.status(500).send("Erro ao cadastrar usuário.");
  }
});

router.get('/login', (req, res) => {
  res.render('login', { erro: null }); 
});

router.post('/login', (req, res) => userController.login(req, res));

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Erro ao sair');
    res.redirect('/');
  });
});

router.put('/api/usuarios/perfil', verificarAutenticacao, async (req, res) => {
  try {
    const userService = require('../services/userService');
    const { nome, email } = req.body;
    
    await userService.updateUser(req.session.user.id, { nome, email });
    
    // Update session
    req.session.user.nome = nome;
    req.session.user.email = email;
    
    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;
