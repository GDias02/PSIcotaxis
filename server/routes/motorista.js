const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");
const viagem_controller = require("../controllers/viagemController");

/// Pedido ROUTES ///
router.get("/pedidos", pedido_controller.pedido_list_pendentes);
router.get("/pedidos/:id_motorista", pedido_controller.pedido_motorista);
router.put("/pedidos/:id", pedido_controller.pedido_update);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);

/// Viagem Routes ///
router.get("/viagens/motorista/:id_motorista", viagem_controller.motorista_viagem_list);
router.get("/viagens/:id", viagem_controller.viagem);
router.post("/viagens/create", viagem_controller.viagem_create);

module.exports = router;
