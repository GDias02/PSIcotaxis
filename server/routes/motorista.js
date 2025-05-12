const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");
const viagem_controller = require("../controllers/viagemController");
const taxi_controller = require("../controllers/taxiController");
const motorista_controller = require("../controllers/motoristaController");
const turno_controller = require("../controllers/turnoController");

/// Motorista ROUTES ///
router.get("/lista", motorista_controller.motorista_list);             //desnecessario para um motorista
router.get("/login/:nif", motorista_controller.motorista_login);
router.get("/id/:id", motorista_controller.motorista);
router.put("/id/:id", motorista_controller.motorista_update);
router.post("/create", motorista_controller.motorista_create);
router.delete("/id/:id", motorista_controller.motorista_delete);

/// Taxi ROUTES ///
router.get("/taxis", taxi_controller.taxi_list);
router.get("/taxis/:id", taxi_controller.taxi);

/// Turno Routes ///
router.get("/turnos/atual", turno_controller.turno_atual);                  //requer Query em HTTP Params com "id_motorista" e com "agora"
router.get("/turnos/motorista/:id", turno_controller.turnos_de_motorista);  //Todos os turnos do motorista com este :id
router.get("/turnos/:id", turno_controller.turno);                          //O turno registado com o :id
router.get("/turnos", turno_controller.taxis_livres);                       //requer Query em HTTP Params com "inicio" e com "fim"
router.put("/turnos/:id", turno_controller.turno_update);
router.post("/turnos/create", turno_controller.turno_create);

/// Pedido ROUTES ///
router.get("/pedidos/eu/:id_motorista", pedido_controller.pedido_motorista);
router.get("/pedidos", pedido_controller.pedido_list_pendentes);
router.get("/pedidos/:id", pedido_controller.pedido);
router.put("/pedidos/:id", pedido_controller.pedido_update);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);

/// Viagem Routes ///
router.get("/viagens/motorista/:id_motorista", viagem_controller.motorista_viagem_list);
router.get("/viagens/:id", viagem_controller.viagem);
router.post("/viagens/create", viagem_controller.viagem_create);

module.exports = router;
