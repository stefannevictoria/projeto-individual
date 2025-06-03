const express = require('express');
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
db.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

require('dotenv').config();

const indexRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use('/', indexRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
