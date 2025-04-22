const Taxi = require("../models/taxi");


const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

function matriculaValidator(v){
        const temLetra = /[A-Za-z]/.test(v);
        const temNumero = /\d/.test(v);
        return temLetra && temNumero;
}

// /taxis - GET
exports.taxi_list = asyncHandler(async (req, res, next) => {
  const taxis = await Taxi.find()
                                    .sort({ registo: 1 })
                                    .exec();
  res.status(200).send(taxis);
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

// /taxi - POST
exports.taxi_create = [
  // Validate and sanitize fields.
  body("matricula", "Matricula tem de ser composta por letras e números, e ter comprimento entre 2 e 12 caracteres")
            .trim()
            .isLength({min:2,max:12})
            .matches(/[A-Za-z]/)
            .matches(/\d/)
            .escape(),
  body("marca", "O nome da marca tem de ter entre 2 e 64 caracteres")
            .trim()
            .isLength({ min: 2, max: 64 })
            .escape(),
  body("modelo", "O nome do modelo tem de ter entre 2 e 64 caracteres")
            .trim()
            .isLength({ min: 2, max: 64 })
            .escape(),
  body("anoDeCompra", `O ano de compra deve ser superior a 1900 e anterior à data atual`)
                      .trim()
                      .isAfter("1900")
                      .isBefore(new Date())
                      .escape(),
  body("conforto", `Conforto tem de ser um dos seguintes valores: ${new Taxi().niveisDeConforto}`)
            .trim()
            .isIn(new Taxi().niveisDeConforto)//This must be always an array
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
      conforto: req.body.conforto,
    });
  
    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({errors: errors});
    } else {
      const sameTaxi = await Taxi.find(taxi).exec();
      if (sameTaxi.length) {
        // 200 - OK
        res.status(200).send({warning: "Taxi duplicado. Nenhum taxi foi criado!"});
      } else {
        // 201 - Created
        await taxi.save();
        const newTaxi = await Taxi.findById(taxi._id).exec();
        res.status(201).send(newTaxi);
      }
    }
  }),
];