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
    const { nome, email, senha, entidade_id, papel } = req.body;
    const senha_hash = await bcrypt.hash(senha, 10);

    console.log("Tentando criar usuário:", nome, email);
    const newUser = await userService.create({ nome, email, senha_hash });
    console.log("Usuário criado:", newUser);

    await entityUserService.create({
      usuario_id: newUser.id,
      entidade_id,
      papel
    });

    console.log("Relação entidade-usuário criada com sucesso");
    res.redirect('/eventos');
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
    res.redirect('/login');
  });
});


module.exports = router;
