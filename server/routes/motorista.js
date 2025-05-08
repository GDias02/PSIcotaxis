const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");

/// Pedido ROUTES ///
router.get("/pedidos", pedido_controller.pedido_list_pendentes);
router.get("/pedidos/:id", pedido_controller.pedido);
router.put("/pedidos/:id", pedido_controller.pedido_update);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);