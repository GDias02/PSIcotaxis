const Taxi = require("../models/taxi");
const Turno = require("../models/turno");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// /turnos de um motorista- GET
exports.turnos_de_motorista = asyncHandler(async (req, res, next) => {
    const turnos_de_motorista = await Turno.find({ motorista: req.params.id })
        .sort({ inicio: "asc" })
        .exec();
    res.status(200).send(turnos_de_motorista);
});

// /taxis que nao estao ocupados num periodo - GET
exports.taxis_livres = asyncHandler(async (req, res, next) => {
    const start = req.body.inicio;
    const end = req.body.fim;

    const turnos = await Turno.find({ $and: [{ inicio: { $lte: end } }, { fim: { $gt: start } }] },
        { _id: 0, taxi: 1 }).exec(); // todos os turnos que intersetam com o periodo indicado
    const list_of_taxi_ids = [];
    turnos.forEach(k => list_of_taxi_ids.push(k["taxi"]));

    const taxis_livres = await Taxi.find({ _id: { $nin: list_of_taxi_ids } })
        .exec();                              // todos os taxis que nao estao nesses turnos
    res.status(200).send(taxis_livres);
});

// /turno/id - GET
exports.turno = asyncHandler(async (req, res, next) => {
    const turno = await Turno.findById(req.params.id)
        .exec();
    if (turno === null) {
        res.status(404).send();
        return;
    }
    res.status(200).send(turno);
});

// /turno - POST
exports.turno_create = [
    // Validate and sanitize fields.
    body("inicio", "O inicio de um turno tem de ser anterior ao seu fim.")
        .trim()
        .custom((i, { req }) => {
            const inicio = new Date(i);
            const fim = new Date(req.body.fim);
            return (inicio < fim);
        })
        .withMessage("O início de um turno tem de ser anterior ao seu fim")
        .escape(),
    body("fim", "Um turno pode durar no maximo 8 horas")
        .trim()
        .custom((f, { req }) => {
            const fim = new Date(f);
            const inicio = new Date(req.body.inicio);
            return ((fim - inicio) / 36e5 <= 8);
        })
        .escape(),
    body("motorista", "O motorista deste turno tem de ser identificado")
        .trim()
        .exists({values: "falsy"})
        .escape(),
    body("taxi", "O taxi deste turno tem de estar identificado")
        .trim()
        .exists({values: "falsy"})
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Taxi object with escaped and trimmed data.
        const turno = new Turno({
            motorista: req.body.motorista,
            taxi: req.body.taxi,
            viagens: [],
            inicio: req.body.inicio,
            fim: req.body.fim,
        });

        if (!errors.isEmpty()) {
            // 400 - Bad Request
            res.status(400).send(errors);
        } else {
            try {
                // 201 - Created
                await turno.save();
                const newTurno = await Turno.findById(turno._id).exec();
                res.status(201).send(newTurno);
            } catch (error) {
                res.status(409).send(error);
            }
        }
    }),
];