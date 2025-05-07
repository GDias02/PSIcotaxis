const express = require('express');
const router = express.Router();

const pedido_controller = require("../controllers/pedidoController");

/// Pedido ROUTES ///
router.get("/pedidos", pedido_controller.pedido_list);
router.get("/pedidos/:id", pedido_controller.pedido);
router.post("/pedidos", pedido_controller.pedido_create);
router.delete("/pedidos/:id", pedido_controller.pedido_delete);

module.exports = router;