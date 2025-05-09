const express = require('express');
const router = express.Router();

const taxi_controller = require("../controllers/taxiController");
const motorista_controller = require("../controllers/motoristaController");
const config_controller = require("../controllers/configController");
const turno_controller = require("../controllers/turnoController");

/// Taxi ROUTES ///
router.get("/taxis", taxi_controller.taxi_list);
router.get("/taxis/marcas_e_modelos", taxi_controller.marcas_e_modelos_list);
router.get("/taxis/:id", taxi_controller.taxi);
router.post("/taxis/create", taxi_controller.taxi_create);

/// Motorista ROUTES ///
router.get("/motoristas", motorista_controller.motorista_list);
router.get("/motoristas/login/:nif", motorista_controller.motorista_login);
router.get("/motoristas/:id", motorista_controller.motorista);
router.post("/motoristas/create", motorista_controller.motorista_create);

/// Turno ROUTES ///
router.get("/turnos", turno_controller.taxis_livres);
router.get("/turnos/:id", turno_controller.turno);
router.get("/turnos/motorista/:id", turno_controller.turnos_de_motorista);
router.post("/turnos/create", turno_controller.turno_create);
router.post("/turnos/update", turno_controller.turno_update);

/// Config ROUTES ///
router.get("/configs", config_controller.config_list);
router.put("/configs", config_controller.config_create);

module.exports = router;