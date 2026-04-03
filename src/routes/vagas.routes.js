const { Router } = require('express');
const vagaController = require('../controllers/vagaController');

const router = Router();

/**
 * @route   GET /vagas/sensores
 * @desc    Lista todos os sensores distintos que já registraram alguma leitura
 * @access  Public
 * @returns {string[]} Array com os IDs únicos dos sensores, ex: ["sensor_1", "sensor_2"]
 */
router.get('/sensores', vagaController.listarSensores);

/**
 * @route   POST /vagas
 * @desc    Registra uma nova leitura de sensor (status da vaga)
 * @body    { sensor: string, status: "ocupado"|"livre" }
 * @returns {object} { id: number } ID do registro inserido
 */
router.post('/', vagaController.registrar);

/**
 * @route   GET /vagas/:sensor/historico
 * @desc    Retorna todo o histórico de leituras de um sensor específico
 * @param   sensor - ID do sensor
 * @returns {object[]} Lista de registros em ordem decrescente de data
 */
router.get('/:sensor/historico', vagaController.historico);

/**
 * @route   GET /vagas/:sensor/status
 * @desc    Retorna o status mais recente de um sensor específico
 * @param   sensor - ID do sensor
 * @returns {object} Último registro do sensor ou 404 se não encontrado
 */
router.get('/:sensor/status', vagaController.statusAtual);

module.exports = router;
