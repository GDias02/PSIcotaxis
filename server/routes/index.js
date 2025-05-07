const express = require('express');
const router = express.Router();


/* GET gestor's page. */
router.get('/', function(req, res, next) {
  res.redirect("/gestor");
});

/* GET servicos page. */
router.get('/servicos', function(req, res, next) {
  res.redirect("/servicos");
});

/* GET clientes page. */
router.get('/clientes', function(req, res, next) {
  res.redirect("/clientes");
});



module.exports = router;
