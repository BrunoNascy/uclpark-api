require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log('Conexão com o banco de dados estabelecida.');
  } catch (err) {
    console.error('Falha ao conectar no banco de dados:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

start();
