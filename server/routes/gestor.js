const express = require('express');
const router = express.Router();

const taxi_controller = require("../controllers/taxiController");
const motorista_controller = require("../controllers/motoristaController");
const config_controller = require("../controllers/configController");
/*
/// Taxi ROUTES ///
router.get("/taxis", taxi_controller.taxi_list);
router.get("/taxis/:id", taxi_controller.taxi);
router.post("/taxis/create", taxi_controller.taxi_create);
*/
/// Motorista ROUTES ///
router.get("/motoristas", motorista_controller.motorista_list);
router.get("/motoristas/:id", motorista_controller.motorista);
router.post("/motoristas/create", motorista_controller.motorista_create);
/*
/// Config ROUTES ///
router.get("/configs", config_controller.config_list);
router.put("/config", config_controller.config_create);
*/
module.exports = router;