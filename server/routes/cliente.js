const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");
const cliente_controller = require("../controllers/clienteController");

/// Pedido ROUTES ///
router.get("/pedidos", pedido_controller.pedido_list);
router.get("/pedidos/:id", pedido_controller.pedido);
router.post("/pedidos", pedido_controller.pedido_create);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);

/// Cliente (themselves) ROUTES ///
router.get("", cliente_controller.cliente_list); //equivalente a /clientes
router.get("/cliente/:id", cliente_controller.cliente);
router.get("/cliente/nif/:nif", cliente_controller.cliente_nif);
router.post("/cliente", cliente_controller.cliente_create);
router.put("/cliente/:id", cliente_controller.cliente_update);
router.delete("/cliente/:id", cliente_controller.cliente_delete);

module.exports = router;