const vagaRepository = require('../repositories/vagaRepository');
const AppError = require('../errors/AppError');

async function registrarLeitura({ sensor, status }) {
  const ultimo = await vagaRepository.buscarUltimoPorSensor(sensor);

  if (ultimo && ultimo.status === status) {
    throw new AppError(`Vaga já está com status "${status}"`);
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

async function listarStatusAtual() {
  return vagaRepository.buscarStatusTodos();
}

module.exports = { registrarLeitura, buscarHistorico, buscarStatusAtual, listarSensores, listarStatusAtual };
