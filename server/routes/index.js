const express = require('express');
const router = express.Router();

router.get('/initiateDebug', init_controller.init);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/gestor");
});

module.exports = router;
