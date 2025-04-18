const Motorista = require("../models/motorista");
const Pessoa = require("../models/pessoa");

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

// /motorista - POST
exports.motorista_create = [
  // Validate and sanitize fields.
  body("nif", "Nif tem de ser composto por 9 dígitos e ser positivo")
            .trim()
            .isLength(9)
            .escape(),
  body("nome", "O nome tem de ter entre 2 e 64 caracteres")
            .trim()
            .isLength({ min: 2, max: 64 })
            .escape(),
  body("genero", `Género tem de ser um dos seguintes valores: ${ new Pessoa().generosPossiveis}`)
            .trim()
            .isIn(new Pessoa().generosPossiveis)//This must be always an array
            .escape(),
  body("anoDeNascimento", `O ano de nascimento deve corresponder a uma data válida`)
            .trim()
            .isAfter("1900")
            .isBefore(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString())
            .escape(),
  body("cartaDeConducao")
            .trim()
            .isLength({min:2,max:32})
            .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
  
    // Create a Motorista object with escaped and trimmed data.
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
      res.status(400).send({errors: errors});
    } else {
      const sameMotorista = await Motorista.find(motorista).exec();
      if (sameMotorista.length) {
        // 200 - OK
        res.status(200).send({warning: "Motorista Duplicado. Nenhum motorista foi criado!"});
      } else {
        // 201 - Created
        await motorista.save();
        const newMotorista = await Motorista.findById(motorista._id).exec();
        res.status(201).send(newMotorista);
      }
    }
  }),
];