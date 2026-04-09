const vagaService = require('../services/vagaService');

async function registrar(req, res, next) {
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
    next(err);
  }
}

async function historico(req, res, next) {
  try {
    const registros = await vagaService.buscarHistorico(req.params.sensor);
    return res.json(registros);
  } catch (err) {
    next(err);
  }
}

async function statusAtual(req, res, next) {
  try {
    const ultimo = await vagaService.buscarStatusAtual(req.params.sensor);

    if (!ultimo) {
      return res.status(404).json({ erro: 'Nenhum registro encontrado para este sensor' });
    }

    return res.json(ultimo);
  } catch (err) {
    next(err);
  }
}

async function listarSensores(req, res, next) {
  try {
    const sensores = await vagaService.listarSensores();
    return res.json(sensores);
  } catch (err) {
    next(err);
  }
}

async function statusTodos(req, res, next) {
  try {
    const status = await vagaService.listarStatusAtual();
    return res.json(status);
  } catch (err) {
    next(err);
  }
}

module.exports = { registrar, historico, statusAtual, listarSensores, statusTodos };
