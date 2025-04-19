const Config = require("../models/config")

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// /configs - GET
exports.config_list = asyncHandler(async (req, res, next) => {
  const configs = await Config.find().exec();
  res.status(200).send(configs);
});

// /config - PUT
exports.config_create = [
  // Validate and sanitize fields.
  body("ppm_basico", "Preço por minuto tem de ser positivo e não muito elevado")
            .trim()
            .isLength({min: 0.01, max: 100})
            .escape(),
  body("ppm_luxuoso", "Preço por minuto tem de ser positivo e não muito elevado")
            .trim()
            .isLength({min: 0.01, max: 100})
            .escape(),
  body("agravamento", "Agravamento tem de ser positivo e não muito elevado")
            .trim()
            .isLength({min: 0, max: 100})
            .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
  
    // Create a Motorista object with escaped and trimmed data.
    const config = new Config({
      ppm_basico: req.body.ppm_basico,
      ppm_luxuoso: req.body.ppm_luxuoso,
      agravamento: req.body.agravamento,
    });
  
    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({errors: errors});
    } else {
      await config.save();
      const newConfig = await Config.findById(config._id).exec();
      res.status(201).send(newConfig);
    }
  }),
];