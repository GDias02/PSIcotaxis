const express = require('express');
const router = express.Router();

const init_controller = require('../controllers/initController');

router.get('/initiateDebug', init_controller.init);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/gestor");
});

module.exports = router;
