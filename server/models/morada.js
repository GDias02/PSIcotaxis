const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moradaSchema = new Schema({
    rua: { type: String, minLength: 2, maxLength: 64, required: true },
    numeroDePorta: { type: String, minLength: 2, maxLength: 16, required: true },
    codigoPostal: { type: String, minLength: 8, maxLength: 8, required: true },
    localidade: { type: String, minLength: 2, maxLength: 32, required: true}
});

// Export model
module.exports = mongoose.model("Morada", moradaSchema);