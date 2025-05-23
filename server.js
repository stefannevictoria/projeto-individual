const express = require('express');
const db = require('./config/db');
db.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

require('dotenv').config();

const indexRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use('/', indexRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(`Hora atual no banco: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Erro ao conectar com o banco.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
