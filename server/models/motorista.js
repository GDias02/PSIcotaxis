const mongoose = require("mongoose");
const Pessoa = require("./pessoa");

const Schema = mongoose.Schema;

const MotoristaSchema = new Schema({
    anoDeNascimento: { type: Date, min: '1900', max: new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), required: true },
    cartaDeConducao: { type: String, minLength: 2, maxLength: 32, unique: true, required: true },
    morada: { type: Schema.Types.ObjectId, ref: "Morada", required: true }
});

const Motorista = Pessoa.discriminator("Motorista", MotoristaSchema);

// Export model
module.exports = mongoose.model("Motorista");