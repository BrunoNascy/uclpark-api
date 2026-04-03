const vagaService = require('../services/vagaService');

async function registrar(req, res) {
  const { sensor, status } = req.body;

  if (!sensor || !status) {
    return res.status(400).json({ erro: 'Campos obrigatórios: sensor, status' });
  }

  if (!['ocupado', 'livre'].includes(status)) {
    return res.status(400).json({ erro: 'status deve ser "ocupado" ou "livre"' });
  }

  try {
    const resultado = await vagaService.registrarLeitura({ sensor, status });
    return res.status(201).json(resultado);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ erro: err.mensagem });
    }
    throw err;
  }
}

async function historico(req, res) {
  const { sensor } = req.params;
  const registros = await vagaService.buscarHistorico(sensor);
  return res.json(registros);
}

async function statusAtual(req, res) {
  const { sensor } = req.params;
  const ultimo = await vagaService.buscarStatusAtual(sensor);

  if (!ultimo) {
    return res.status(404).json({ erro: 'Nenhum registro encontrado para este sensor' });
  }

  return res.json(ultimo);
}

async function listarSensores(req, res) {
  const sensores = await vagaService.listarSensores();
  return res.json(sensores);
}

module.exports = { registrar, historico, statusAtual, listarSensores };
