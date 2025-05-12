const express = require('express');
const router = express.Router();


/* GET gestor's page. */
router.get('/', function(req, res, next) {
  res.redirect("/cliente");
});

module.exports = router;
