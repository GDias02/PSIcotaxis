const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const viagemSchema = new Schema({
    seq: { type: Number, min: 1, max: 500, unique: true, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    numeroDePassageiros: {type: Number, min: 1, required: true},
    partida: { type: Schema.Types.ObjectId, ref: "Morada", required: true },
    chegada: { type: Schema.Types.ObjectId, ref: "Morada", required: true },
    inicio: { type: Date, required: true },
    fim: { type: Date },
    custo: { type: Number, min: 0.01 }
});

module.exports = viagemSchema;