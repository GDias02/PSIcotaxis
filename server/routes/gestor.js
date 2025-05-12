const express = require('express');
const router = express.Router();

const taxi_controller = require("../controllers/taxiController");
const motorista_controller = require("../controllers/motoristaController");
const config_controller = require("../controllers/configController");
const turno_controller = require("../controllers/turnoController");
const cliente_controller = require("../controllers/clienteController");
const gestor_controller = require("../controllers/gestorController");

/// Gestor (self) ROUTES ///
router.get("/login/:nif", gestor_controller.gestor_nif);
router.get("/id/:id", gestor_controller.gestor);

/// Taxi ROUTES ///
router.get("/taxis", taxi_controller.taxi_list);
router.get("/taxis/marcas_e_modelos", taxi_controller.marcas_e_modelos_list);
router.get("/taxis/:id", taxi_controller.taxi);
router.put("/taxis/:id", taxi_controller.taxi_update);
router.delete("/taxis/:id", taxi_controller.taxi_delete);
router.post("/taxis/create", taxi_controller.taxi_create);

/// Motorista ROUTES ///
router.get("/motoristas", motorista_controller.motorista_list);
router.get("/motoristas/:id", motorista_controller.motorista);
router.post("/motoristas/create", motorista_controller.motorista_create);

/// Cliente ROUTES ///
router.get("/clientes", cliente_controller.cliente_list);               //equivalente a /clientes
router.get("/cliente/:id", cliente_controller.cliente);
router.get("/cliente/nif/:nif", cliente_controller.cliente_nif);        //desnecessario

/// Turno ROUTES ///
router.get("/turnos/motorista/:id", turno_controller.turnos_de_motorista);
router.get("/turnos/:id", turno_controller.turno);

/// Config ROUTES ///
router.get("/configs", config_controller.config_list);
router.put("/configs", config_controller.config_create);

module.exports = router;