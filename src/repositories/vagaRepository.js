const pool = require('../config/database');

async function inserir({ sensor_id, status, data }) {
  const [result] = await pool.execute(
    'INSERT INTO historico_vagas (sensor_id, status, data) VALUES (?, ?, ?)',
    [sensor_id, status, data]
  );
  return result.insertId;
}

async function buscarUltimoPorSensor(sensor_id) {
  const [rows] = await pool.execute(
    'SELECT sensor_id, status, data FROM historico_vagas WHERE sensor_id = ? ORDER BY data DESC LIMIT 1',
    [sensor_id]
  );
  return rows[0] || null;
}

async function buscarHistoricoPorSensor(sensor_id) {
  const [rows] = await pool.execute(
    'SELECT id, sensor_id, status, data FROM historico_vagas WHERE sensor_id = ? ORDER BY data DESC',
    [sensor_id]
  );
  return rows;
}

async function listarSensores() {
  const [rows] = await pool.execute(
    'SELECT DISTINCT sensor_id FROM historico_vagas ORDER BY sensor_id'
  );
  return rows.map((r) => r.sensor_id);
}

async function buscarStatusTodos() {
  const [rows] = await pool.execute(
    `SELECT sensor_id, status, data
     FROM historico_vagas h1
     WHERE data = (
       SELECT MAX(data) FROM historico_vagas h2 WHERE h2.sensor_id = h1.sensor_id
     )
     ORDER BY sensor_id`
  );
  return rows;
}

module.exports = { inserir, buscarUltimoPorSensor, buscarHistoricoPorSensor, listarSensores, buscarStatusTodos };
