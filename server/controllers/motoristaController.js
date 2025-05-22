const Motorista = require("../models/motorista");
const Pessoa = require("../models/pessoa");
const Turno = require("../models/turno"); 


const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// /motoristas - GET
exports.motorista_list = asyncHandler(async (req, res, next) => {
  const motoristas = await Motorista.find()
    .sort({ registo: 1 })
    .exec();
  res.status(200).send(motoristas);
});

// /motorista/id - GET
exports.motorista = asyncHandler(async (req, res, next) => {
  const motorista = await Motorista.findById(req.params.id)
    .exec();
  if (motorista === null) {
    res.status(404).send();
    return;
  }
  res.status(200).send(motorista);
});

// /motoristas/login/:nif - GET
exports.motorista_login = asyncHandler(async (req, res, next) => {
  const motorista = await Motorista.findOne({ nif: req.params.nif })
    .exec();
  if (motorista === null) {
    res.status(404).send();
    return;
  }
  res.status(200).send(motorista);
});

exports.motorista_delete = asyncHandler(async (req, res, next) => {
  const motoristaId = req.params.id;

  try {
    const motorista = await Motorista.findById(motoristaId).exec();

    if (!motorista) {
      return res.status(404).json({ erro: "Motorista não encontrado." });
    }

    // Verifica se o motorista tem turnos associados
    const temTurnos = await Turno.exists({ motorista: motoristaId });

    if (temTurnos) {
      return res.status(400).json({
        erro: "Este motorista não pode ser removido porque já requisitou táxis em turnos."
      });
    }

    await Motorista.findByIdAndDelete(motoristaId).exec();
    return res.status(204).send();

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao tentar remover o motorista." });
  }
});



// /motorista - POST
exports.motorista_create = [
  // Validate and sanitize fields.
  body("nif", "Nif tem de ser composto por 9 dígitos e ser positivo")
    .trim()
    .isInt({ min: 100000000, max: 999999999 })
    .escape(),
  body("nome", "O nome tem de ter entre 2 e 64 caracteres, também não pode ter dígitos")
    .trim()
    .matches(/^[^\d]*$/)
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("genero", `Género tem de ser um dos seguintes valores: ${new Pessoa().generosPossiveis}`)
    .trim()
    .isIn(new Pessoa().generosPossiveis)//This must be always an array
    .escape(),
  body("anoDeNascimento", `A idade do motorista deve ser maior que 18`)
    .trim()
    .isAfter("1900")
    .isBefore(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString())
    .escape(),
  body("cartaDeConducao", 'A carta de condução tem de ter entre 2 e 32 caracteres')
    .trim()
    .isLength({ min: 2, max: 32 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const motorista = new Motorista({
      registo: Date.now(),
      nif: req.body.nif,
      nome: req.body.nome,
      genero: req.body.genero,
      anoDeNascimento: req.body.anoDeNascimento,
      cartaDeConducao: req.body.cartaDeConducao,
      morada: req.body.morada
    });


    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({ errors: errors });
    } else {
      try {
        // Create a Motorista object with escaped and trimmed data.
        // 201 - Created
        await motorista.save()
        const newMotorista = await Motorista.findById(motorista._id).exec();
        res.status(201).send(newMotorista);
      } catch (error) {
        res.status(409).send(error)
      }
    }
  }),
];

exports.motorista_update = [
  // Validate and sanitize fields.
  body("nif", "Nif tem de ser composto por 9 dígitos e ser positivo")
    .trim()
    .isInt({ min: 100000000, max: 999999999 })
    .escape(),
  body("nome", "O nome tem de ter entre 2 e 64 caracteres, também não pode ter dígitos")
    .trim()
    .matches(/^[^\d]*$/)
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("genero", `Género tem de ser um dos seguintes valores: ${new Pessoa().generosPossiveis}`)
    .trim()
    .isIn(new Pessoa().generosPossiveis)//This must be always an array
    .escape(),
  body("anoDeNascimento", `A idade do motorista deve ser maior que 18`)
    .trim()
    .isAfter("1900")
    .isBefore(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString())
    .escape(),
  body("cartaDeConducao", 'A carta de condução tem de ter entre 2 e 32 caracteres')
    .trim()
    .isLength({ min: 2, max: 32 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const motorista = new Motorista({
      _id: req.params.id,
      registo: Date.now(),
      nif: req.body.nif,
      nome: req.body.nome,
      genero: req.body.genero,
      anoDeNascimento: req.body.anoDeNascimento,
      cartaDeConducao: req.body.cartaDeConducao,
      morada: req.body.morada
    });

    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({ errors: errors.array() });
      return;
    } else {
      // Check to see if the pedido already exists
      const motoristaExistente = await Motorista.findOne({ _id: motorista._id }).exec();
      if (motoristaExistente) {
        let updatedMotorista = await Motorista.findByIdAndUpdate(req.params.id, motorista, { new: true }).exec();
        updatedMotorista = await Motorista.findById(req.params.id);
        // 201 - Created
        return res.status(201).send(updatedMotorista);
      }
    }
    // Pedido does not exist, cannot update it
    res.status(400).send({ error: "Pedido não existe" });
    })
];