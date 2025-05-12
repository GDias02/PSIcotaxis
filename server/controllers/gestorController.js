const Gestor = require('../models/gestor');
const Pessoa = require('../models/pessoa');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


// /gestor/id - GET
exports.gestor = asyncHandler(async (req, res, next) => {
    const gestor = await Gestor.findById(req.params.id)
                                .exec();
    if (gestor === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(gestor);
});

// /gestor/login/:nif - GET
exports.gestor_nif = asyncHandler(async (req, res, next) => {
    const gestor = await Gestor.findOne({ nif: req.params.nif })
                                .exec();
    if (gestor === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(gestor);
});