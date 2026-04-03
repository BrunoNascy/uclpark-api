const vagaRepository = require('../repositories/vagaRepository');

async function registrarLeitura({ sensor, status }) {
  const ultimo = await vagaRepository.buscarUltimoPorSensor(sensor);

  if (ultimo && ultimo.status === status) {
    throw { statusCode: 400, mensagem: `Vaga já está com status "${status}"` };
  }

  const id = await vagaRepository.inserir({
    sensor_id: sensor,
    status,
    data: new Date(),
  });

  return { id };
}

async function buscarHistorico(sensor_id) {
  return vagaRepository.buscarHistoricoPorSensor(sensor_id);
}

async function buscarStatusAtual(sensor_id) {
  return vagaRepository.buscarUltimoPorSensor(sensor_id);
}

async function listarSensores() {
  return vagaRepository.listarSensores();
}

module.exports = { registrarLeitura, buscarHistorico, buscarStatusAtual, listarSensores };
