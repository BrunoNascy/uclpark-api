const { Router } = require('express');
const vagasRoutes = require('./vagas.routes');

const router = Router();

router.use('/vagas', vagasRoutes);

module.exports = router;
