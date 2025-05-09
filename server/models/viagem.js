const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const viagemSchema = new Schema({
    seq: { type: Number, min: 1, max: 500, required: true },
    motorista: { type: Schema.Types.ObjectId, ref: "Motorista", required: true },
    taxi: { type: Schema.Types.ObjectId, ref: "Taxi", required: true },
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true},
    numeroDePassageiros: {type: Number, min: 1, required: true},
    partida: { type: Schema.Types.ObjectId, ref: "Morada", required: true},
    chegada: { type: Schema.Types.ObjectId, ref: "Morada", required: true},
    inicio: { type: Date, required: true },
    fim: { type: Date },
    kilometros: { type: Number, min: 0 },
    custo: { type: Number, min: 0.01}
});

module.exports = mongoose.model("Viagem", viagemSchema);