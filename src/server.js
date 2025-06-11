const express = require('express');
const path = require('path');
const db = require('./config/db');
require('dotenv').config();

db.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const userController = require('./controllers/userController')
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'sua_chave_secreta_segura',
  resave: false,
  saveUninitialized: false
}));

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => userController.login(req, res));

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
