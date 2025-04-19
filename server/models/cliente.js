const mongoose = require("mongoose");
const Pessoa = require("./pessoa");

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({});

const Cliente = Pessoa.discriminator("Cliente", ClienteSchema);

// Export model
module.exports = mongoose.model("Cliente");