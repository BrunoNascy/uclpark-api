const { Router } = require('express');
const vagaController = require('../controllers/vagaController');

const router = Router();

router.post('/', vagaController.registrar);
router.get('/:sensor/historico', vagaController.historico);
router.get('/:sensor/status', vagaController.statusAtual);

module.exports = router;
