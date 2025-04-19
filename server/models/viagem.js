const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const viagemSchema = new Schema({
    motorista: { type: Schema.Types.ObjectId, ref: "Motorista", required: true },
    taxi: { type: Schema.Types.ObjectId, ref: "Taxi", required: true },
    clientes: [{ type: Schema.Types.ObjectId, ref: "Cliente" }],
    partida: { type: Schema.Types.ObjectId, ref: "Morada", required: true },
    chegada: { type: Schema.Types.ObjectId, ref: "Morada" },
    inicio: { type: Date, required: true },
    fim: { type: Date },
});

// Export model
module.exports = mongoose.model("Viagem", viagemSchema);