const mongoose = require("mongoose");
const Pessoa = require("./pessoa");

const Schema = mongoose.Schema;

const GestorSchema = new Schema({});

const Gestor = Pessoa.discriminator("Gestor", GestorSchema);

// Export model
module.exports = mongoose.model("Gestor");