const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generosPossiveis = ["feminino", "masculino"]

const baseOptions = {
    discriminatorKey: 'tipo',
    collection: 'pessoas'
}

const pessoaSchema = new Schema({
    registo: { type: Date, default: Date.now(), required: true},
    nif: { type: Number, min: 100000000, max: 999999999, unique: true, required: true },
    nome: { type: String, minLength: 2, maxLength: 64, required: true },
    genero: {
        type: String,
        required: true,
        enum: generosPossiveis,
        default: "feminino"
    },
    tipo: { type: String, enum: ['Motorista', 'Cliente'] }
}, baseOptions);

pessoaSchema.virtual('generosPossiveis').get(function() {
    return generosPossiveis;
})

// Export model
module.exports = mongoose.model("Pessoa", pessoaSchema);