const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const turnoSchema = new Schema({
    motorista: { type: Schema.Types.ObjectId, ref: "Motorista", required: true },
    taxi: { type: Schema.Types.ObjectId, ref: "Taxi", required: true },
    viagens: {type: [Schema.Types.ObjectId], ref: "Viagem", default: []},
    inicio: { type: Date, required: true },
    fim: { type: Date }
});

// Export model
module.exports = mongoose.model("Turno", turnoSchema);