const Pedido = require("../models/pedido");
const Pessoa = require("../models/pessoa");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// /pedidos - GET
exports.pedido_list = asyncHandler(async (req, res, next) => {
    const pedidos = await Pedido.find()
                                .exec();
    res.status(200).send(pedidos);
});

// /pedidos/id - GET
exports.pedido = asyncHandler(async (req, res, next) => {
    const pedido = await Pedido.findById(req.params.id)
                                .exec();
    if (pedido === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(pedido);
});

// /pedidos - GET
exports.pedido_list_pendentes = asyncHandler(async (req, res, next) => {
    const pedidos = await Pedido.find({ status: "pendente" })
                                .exec();
    res.status(200).send(pedidos);
});

// /pedidos/id - DELETE
exports.pedido_delete = asyncHandler(async (req, res, next) => {
    const pedido = await Pedido.findById(req.params.id)
                                .exec();
    if (pedido === null) {
        res.status(404).send();
        return;
    }
    await Pedido.findByIdAndDelete(req.params.id)
                .exec();
    res.status(204).send();
});

// /pedidos/id - PUT
exports.pedido_update = [
    body("numDePassageiros", "Número de passageiros tem de ser entre 1 e 4")
        .isInt({ min: 1, max: 4 })
        .escape(),
    body("luxuoso", "Luxuoso tem de ser um booleano")
        .isBoolean()
        .escape(),
    body("coordenadasDe")
        .trim()
        .matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)
        .escape(),
    body("coordenadasPara")
        .trim()
        .matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)
        .escape(),
    body("status", `Status tem de ser um dos seguintes valores: ${new Pedido().statusPossiveis}`)
        .trim()
        .isIn(new Pedido().statusPossiveis) // This must be always an array
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const pedido = new Pedido({
            _id: req.params.id,
            motorista: req.body.motorista,
            taxi: req.body.taxi,
            moradaDe: req.body.moradaDe,
            moradaPara: req.body.moradaPara,
            numDePassageiros: req.body.numDePassageiros,
            luxuoso: req.body.luxuoso,
            cliente: req.body.cliente,
            coordenadasDe: req.body.coordenadasDe,
            coordenadasPara: req.body.coordenadasPara,
            status: req.body.status
        });

        if (!errors.isEmpty()) {
            // 400 - Bad Request
            res.status(400).send({ errors: errors.array() });
            return;
        } else {
            // Check to see if the pedido already exists
            const pedidoExistente = await Pedido.findOne({ _id: pedido._id }).exec();
            if (pedidoExistente) {
                let updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, pedido, { new: true }).exec();
                updatedPedido = await Pedido.findById(req.params.id);
                // 201 - Created
                return res.status(201).send(updatedPedido);
            }
        }
        // Pedido does not exist, cannot update it
        res.status(400).send({ error: "Pedido não existe" });
    })
]

// /pedidos - POST
exports.pedido_create = [
    body("numDePassageiros", "Número de passageiros tem de ser entre 1 e 4")
        .isInt({ min: 1, max: 4 })
        .escape(),
    body("luxuoso", "Luxuoso tem de ser um booleano")
        .isBoolean()
        .escape(),
    body("coordenadasDe", "Coordenadas devem ter o formato latitude,longitude")
        .trim()
        .customSanitizer(value => value.replace(/\s+/g, ''))
        .matches(/^[-+]?\d{1,3}(?:\.\d+)?,[-+]?\d{1,3}(?:\.\d+)?$/)
        .withMessage("Coordenadas devem estar no formato correcto com números válidos."),
    body("coordenadasPara", "Coordenadas devem ter o formato latitude,longitude")
        .trim()
        .customSanitizer(value => value.replace(/\s+/g, ''))
        .matches(/^[-+]?\d{1,3}(?:\.\d+)?,[-+]?\d{1,3}(?:\.\d+)?$/)
        .withMessage("Coordenadas devem estar no formato correcto com números válidos."),
    body("status", `Status tem de ser um dos seguintes valores: ${new Pedido().statusPossiveis}`)
        .trim()
        .isIn(new Pedido().statusPossiveis) // This must be always an array
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const pedido = new Pedido({
            motorista: req.body.motorista,
            taxi: req.body.taxi,
            moradaDe: req.body.moradaDe,
            moradaPara: req.body.moradaPara,
            numDePassageiros: req.body.numDePassageiros,
            luxuoso: req.body.luxuoso,
            cliente: req.body.cliente,
            coordenadasDe: req.body.coordenadasDe,
            coordenadasPara: req.body.coordenadasPara,
            status: req.body.status
        });

        if (!errors.isEmpty()) {
            // 400 - Bad Request
            res.status(400).send({ errors: errors.array() });
            return;
        }

        const clienteHasPedido = await Pedido.findOne({cliente: pedido.cliente});
        if (clienteHasPedido){
            res.status(403).send("There is already a pedido from this cliente");
            return;
        }

        try {
            await pedido.save();
        } catch (err) {
            res.status(500).send(err);
            return;
        }

        pedido = await Pedido.findOne({cliente: pedido.cliente});
        res.status(201).send(pedido);
    })
];