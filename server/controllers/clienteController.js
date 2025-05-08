const Cliente = require('../models/cliente');
const Pessoa = require('../models/pessoa');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


// /clientes - GET
exports.cliente_list = asyncHandler(async (req, res, next) => {
    const clientes = await Cliente.find()
                                .sort({ nome: 1 })
                                .exec();
    res.status(200).send(clientes);
});

// /cliente/id - GET
exports.cliente = asyncHandler(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id)
                                .exec();
    if (cliente === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(cliente);
});

// /cliente/nif/:nif - GET
exports.cliente_nif = asyncHandler(async (req, res, next) => {
    const cliente = await Cliente.findOne({ nif: req.params.nif })
                                .exec();
    if (cliente === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(cliente);
});

// /cliente - POST
exports.cliente_create = [
    // Validate and sanitize fields.
    body("nif", "Nif tem de ser composto por 9 dígitos e ser positivo")
            .trim()
            .isInt({min: 100000000, max: 999999999})
            .escape(),
    body("nome", "O nome tem de ter entre 2 e 64 caracteres, também não pode ter dígitos")
            .trim()
            .matches(/^[^\d]*$/)
            .isLength({ min: 2, max: 64 })
            .escape(),
    body("genero", `Género tem de ser um dos seguintes valores: ${ new Pessoa().generosPossiveis}`)
            .trim()
            .isIn(new Pessoa().generosPossiveis)//This must be always an array
            .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const cliente = new Cliente({
            nif: req.body.nif,
            nome: req.body.nome,
            genero: req.body.genero,
        });

        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }
        await cliente.save();
        const savedCliente = await Cliente.findById(cliente._id)
                                        .exec();
        res.status(201).send(savedCliente);
    })
];

exports.cliente_update = [
    // Validate and sanitize fields.
    body("nif", "Nif tem de ser composto por 9 dígitos e ser positivo")
            .trim()
            .isInt({min: 100000000, max: 999999999})
            .escape(),
    body("nome", "O nome tem de ter entre 2 e 64 caracteres, também não pode ter dígitos")
            .trim()
            .matches(/^[^\d]*$/)
            .isLength({ min: 2, max: 64 })
            .escape(),
    body("genero", `Género tem de ser um dos seguintes valores: ${ new Pessoa().generosPossiveis}`)
            .trim()
            .isIn(new Pessoa().generosPossiveis)//This must be always an array
            .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const cliente = new Cliente({
            _id: req.params.id,
            nif: req.body.nif,
            nome: req.body.nome,
            genero: req.body.genero,
        });

        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }
        await Cliente.findByIdAndUpdate(req.params.id, cliente)
                    .exec();
        res.status(200).send(cliente);
    })
];

exports.cliente_delete = asyncHandler(async (req, res, next) => {
    const cliente = await Cliente.findById(req.params.id)
                                .exec();
    if (cliente === null) {
        res.status(404).send();
        return;
    }
    await Cliente.findByIdAndDelete(req.params.id)
                .exec();
    res.status(200).send(cliente);
});