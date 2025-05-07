const express = require("express");
const router = express.Router();
const Motorista = require("../models/motorista");

//  Login por NIF
router.post("/login", async (req, res) => {
  const { nif } = req.body;

  if (!nif || nif.toString().length !== 9) {
    return res.status(400).json({ erro: "NIF inválido (RIA 10)." });
  }

  try {
    const motorista = await Motorista.findOne({ nif });
    if (!motorista) {
      return res.status(404).json({ erro: "Motorista não encontrado." });
    }
    res.status(200).json(motorista);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao procurar motorista." });
  }
});

//  Lista de motoristas (para login)
router.get("/", async (req, res) => {
  try {
    const motoristas = await Motorista.find().select("nome nif _id");
    res.status(200).json(motoristas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar motoristas." });
  }
});

// Obter motorista por NIF via URL (GET)
router.get("/nif/:nif", async (req, res) => {
  const nif = req.params.nif;

  if (!nif || nif.toString().length !== 9) {
    return res.status(400).json({ erro: "NIF inválido ." });
  }

  try {
    const motorista = await Motorista.findOne({ nif });
    if (!motorista) {
      return res.status(404).json({ erro: "Motorista não encontrado." });
    }
    res.status(200).json(motorista);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao procurar motorista." });
  }
});


module.exports = router;
