const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");
const cliente_controller = require("../controllers/clienteController");
const viagem_controller = require("../controllers/viagemController");

/// Pedido ROUTES ///
router.get("/pedidos", pedido_controller.pedido_list);
router.get("/pedidos/:id", pedido_controller.pedido);
router.post("/pedidos/create", pedido_controller.pedido_create);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);

/// Viagem Routes ///
router.get("/viagens/cliente/:id_cliente", viagem_controller.cliente_viagem_list);
router.get("/viagens/:id", viagem_controller.viagem);

/// Cliente (themselves) ROUTES ///
router.get("/nif/:nif", cliente_controller.cliente_nif);
router.get("/login/:nif", cliente_controller.cliente_nif);
router.get("/id/:id", cliente_controller.cliente);
router.post("/create", cliente_controller.cliente_create);
router.put("/id/:id", cliente_controller.cliente_update);
router.delete("/id/:id", cliente_controller.cliente_delete);

module.exports = router;