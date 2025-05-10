const Viagem = require("../models/viagem");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// /viagens/motorista - GET
exports.motorista_viagem_list = asyncHandler(async (req, res, next) => {
  const viagens = await Viagem.find({ motorista: req.params.id_motorista }).exec();
  res.status(200).send(viagens);
});

// /viagem/id - GET
exports.viagem = asyncHandler(async (req, res, next) => {
  const viagem = await Viagem.findById(req.params.id).exec();
  if (viagem === null) {
    res.status(404).send();
    return;
  }
  res.status(200).send(viagem);
});

// /viagem - POST
exports.viagem_create = [
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const viagem = new Viagem({
      seq: req.body.seq,
      motorista: req.body.motorista,
      taxi: req.body.taxi,
      cliente: req.body.cliente,
      numeroDePassageiros: req.body.numeroDePassageiros,
      partida: req.body.partida,
      chegada: req.body.chegada,
      inicio: req.body.inicio,
      fim: req.body.fim,
      kilometros: req.body.kilometros,
      custo: req.body.custo
    });
  
    
    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({errors: errors});
    } else {
      try {
        // Create a Viagem object with escaped and trimmed data.
        // 201 - Created
        await viagem.save();
        const newViagem = await Viagem.findById(viagem._id).exec();
        res.status(201).send(newViagem);
      } catch (error) {
        console.log(error);
        res.status(409).send(error);
      }
    }
  }),
];