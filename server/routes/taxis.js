const express = require("express");
const router = express.Router();
const Taxi = require("../models/taxi");

// POST /api/taxis - Criar um novo táxi
router.post("/", async (req, res) => {
  try {
    const novoTaxi = new Taxi(req.body);
    await novoTaxi.save();
    res.status(201).json(novoTaxi);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// GET /api/taxis - Listar todos os táxis (mais recentes primeiro)
router.get("/", async (req, res) => {
  try {
    const taxis = await Taxi.find().sort({ criadoEm: -1 });
    res.json(taxis);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar táxis." });
  }
});

module.exports = router;
