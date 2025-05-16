const Taxi = require("../models/taxi");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// /taxis - GET
exports.taxi_list = asyncHandler(async (req, res, next) => {
  const taxis = await Taxi.find()
    .sort({ registo: 1 })
    .exec();
  res.status(200).send(taxis);
});

// /marcas_e_modelos - GET
exports.marcas_e_modelos_list = asyncHandler(async (req, res, next) => {
  const taxis = await Taxi.find()
    .exec();
  const marcas_e_modelos = {};

  for (taxi of taxis) {
    let mc = taxi["marca"];
    let mod = taxi["modelo"];
    if (Object.getOwnPropertyNames(marcas_e_modelos).includes(mc)) {
      if (!(marcas_e_modelos[`${mc}`].includes(mod))) {
        marcas_e_modelos[`${mc}`].push(mod)
      }
    } else {
      marcas_e_modelos[`${mc}`] = [mod];
    }
  }
  res.status(200).send(marcas_e_modelos);
});

// /taxi/id - GET
exports.taxi = asyncHandler(async (req, res, next) => {
  const taxi = await Taxi.findById(req.params.id)
    .exec();
  if (taxi === null) {
    res.status(404).send();
    return;
  }
  res.status(200).send(taxi);
});

// /taxi/id - DELETE
exports.taxi_delete = asyncHandler(async (req, res, next) => {
    const taxi = await Taxi.findById(req.params.id)
                                .exec();
    //TODO - verificar que o taxi pode ser apagado (?)
    if (taxi === null) {
        res.status(404).send();
        return;
    }
    await Taxi.findByIdAndDelete(req.params.id)
                .exec();
    res.status(204).send();
});

// /taxi/id - PUT
exports.taxi_update = [
  // Validate and sanitize fields.
  body("anoDeCompra", `O ano de compra deve ser superior a 1900 e anterior à data atual`)
    .trim()
    .isAfter("1900")
    .isBefore()        //RIA ** - o ano de compra do taxi deve ser igual ou inferior ao ano atual.
    .escape(),
  body("matricula", "Matricula tem de ser composta por letras e números, e ter comprimento entre 2 e 12 caracteres")
    .trim()
    .isLength({ min: 2, max: 12 })
    .custom((matricula, { req }) => {
      const ano = new Date(req.body.anoDeCompra);
      if (ano < new Date('1992')) { return matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[0-9]{2}"); }
      if (ano < new Date('2005')) { return matricula.match("[0-9]{2}\\-[0-9]{2}\\-[A-Z]{2}"); }
      if (ano < new Date('2020')) { return matricula.match("[0-9]{2}\\-[A-Z]{2}\\-[0-9]{2}"); }
      if (ano <= new Date()) { return matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[A-Z]{2}"); }
      else { return false; }
    })
    .withMessage("A matricula deste carro nao corresponde ao ano da sua compra!\n Desde 2020 (AA-01-AA)\n De 2005 a 2020 (00-AA-00)\n De 1992 a 2005 (00-00-AA)\n Até 1992 (AA-00-00)")
    .escape(),
  body("marca", "O nome da marca tem de ter entre 2 e 64 caracteres")
    .trim()
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("modelo", "O nome do modelo tem de ter entre 2 e 64 caracteres")
    .trim()
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("lugares", "Um taxi tem de ter pelo menos 1 lugar para o condutor.")
    .trim()
    .isInt({ min: 1 })
    .escape(),
  body("conforto", `Conforto tem de ser um dos seguintes valores: ${new Taxi().niveisDeConforto}`)
    .trim()
    .isIn(new Taxi().niveisDeConforto) //RIA 16 - o nivel de conforto deve ser basico ou luxuoso
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const taxi = new Taxi({
      _id: req.params.id,
      registo: Date.now(),
      matricula: req.body.matricula,
      marca: req.body.marca,
      modelo: req.body.modelo,
      anoDeCompra: req.body.anoDeCompra,
      lugares: req.body.lugares,
      conforto: req.body.conforto,
    });
    
    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({ errors: errors.array() });
      return;
    } else {
      // Check to see if the taxi already exists
      const taxiExistente = await Taxi.findOne({ _id: taxi._id }).exec();
      if (taxiExistente) {
        let updatedTaxi = await Taxi.findByIdAndUpdate(req.params.id, taxi, { new: true }).exec();
        updatedTaxi = await Taxi.findById(req.params.id);
        // 201 - Created
        return res.status(201).send(updatedTaxi);
      }
    }
    // taxi does not exist, cannot update it
    res.status(400).send({ error: "Taxi não existe" });
  })
]

// /taxi - POST
exports.taxi_create = [
  // Validate and sanitize fields.
  body("anoDeCompra", `O ano de compra deve ser superior a 1900 e anterior à data atual`)
    .trim()
    .isAfter("1900")
    .isBefore()        //RIA ** - o ano de compra do taxi deve ser igual ou inferior ao ano atual.
    .escape(),
  body("matricula", "Matricula tem de ser composta por letras e números, e ter comprimento entre 2 e 12 caracteres")
    .trim()
    .isLength({ min: 2, max: 12 })
    .custom((matricula, { req }) => {
      const ano = new Date(req.body.anoDeCompra);
      if (ano < new Date('1992')) { return matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[0-9]{2}"); }
      if (ano < new Date('2005')) { return matricula.match("[0-9]{2}\\-[0-9]{2}\\-[A-Z]{2}"); }
      if (ano < new Date('2020')) { return matricula.match("[0-9]{2}\\-[A-Z]{2}\\-[0-9]{2}"); }
      if (ano <= new Date()) { return matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[A-Z]{2}"); }
      else { return false; }
    })
    .withMessage("A matricula deste carro nao corresponde ao ano da sua compra!\n Desde 2020 (AA-01-AA)\n De 2005 a 2020 (00-AA-00)\n De 1992 a 2005 (00-00-AA)\n Até 1992 (AA-00-00)")
    .escape(),
  body("marca", "O nome da marca tem de ter entre 2 e 64 caracteres")
    .trim()
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("modelo", "O nome do modelo tem de ter entre 2 e 64 caracteres")
    .trim()
    .isLength({ min: 2, max: 64 })
    .escape(),
  body("lugares", "Um taxi tem de ter pelo menos 1 lugar para o condutor.")
    .trim()
    .isInt({ min: 1 })
    .escape(),
  body("conforto", `Conforto tem de ser um dos seguintes valores: ${new Taxi().niveisDeConforto}`)
    .trim()
    .isIn(new Taxi().niveisDeConforto) //RIA 16 - o nivel de conforto deve ser basico ou luxuoso
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Taxi object with escaped and trimmed data.
    const taxi = new Taxi({
      registo: Date.now(),
      matricula: req.body.matricula,
      marca: req.body.marca,
      modelo: req.body.modelo,
      anoDeCompra: req.body.anoDeCompra,
      lugares: req.body.lugares,
      conforto: req.body.conforto,
    });

    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send(errors);
    } else {
      try {
        // 201 - Created
        await taxi.save();
        const newTaxi = await Taxi.findById(taxi._id).exec();
        res.status(201).send(newTaxi);
      } catch (error) {
        res.status(409).send(error);
      }
    }
  }),
];