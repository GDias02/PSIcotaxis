const mongoose = require("mongoose");
const viagemSchema = require("./viagem");

const Schema = mongoose.Schema;

const faturaSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    motorista: { type: Schema.Types.ObjectId, ref: "Motorista", required: true },
    custo: { type: Number, min: 0.01, required: true},
    data: { type: Date, required: true },
});

// Export model
module.exports = mongoose.model("Fatura", faturaSchema);