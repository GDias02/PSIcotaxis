const express = require('express');
const router = express.Router();

const servicosController = require('../controllers/servicosController');
const initController = require('../controllers/initController');

// GET - Reinicia a base de dados
router.get('/initiateDebug', initController.init);
router.get('/miniDebug', initController.miniDebug);

// GET - Localidade by código postal
router.get('/localidade/:cod_postal', servicosController.getLocalidadeByCodPostal);



module.exports = router;