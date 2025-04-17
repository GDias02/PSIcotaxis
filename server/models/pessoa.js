const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: 'tipo',
    collection: 'pessoas'
}

const pessoaSchema = new Schema({
    nif: { type: Number, min: 100000000, max: 999999999, unique: true, required: true },
    nome: { type: String, minLength: 2, maxLength: 64, required: true },
    genero: {
        type: String,
        required: true,
        enum: ["feminino", "masculino"],
        default: "feminino"
    },
    tipo: { type: String, required: true, enum: ['Motorista', 'Cliente'] }
}, baseOptions);

// Export model
module.exports = mongoose.model("Pessoa", pessoaSchema);