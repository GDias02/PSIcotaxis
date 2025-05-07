const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generosPossiveis = ["feminino", "masculino"];
const statusPossiveis = ["pendente", "aceite"];

const pedidoSchema = new Schema({
    moradaDe: {
        type: {
            rua: { type: String, required: true },
            localidade: { type: String, required: true },
            codigoPostal: { type: String, required: true },
            numeroDePorta: {type: String}
        },
        required: true
    },
    moradaPara: {
        type: {
            rua: { type: String, required: true },
            localidade: { type: String, required: true },
            codigoPostal: { type: String, required: true },
            numeroDePorta: {type: String}
        },
        required: true
    },
    numDePassageiros: { type:Number, min:1, max:4, required:true },
    luxuoso: { type:Boolean, required: true},
    nif: { type: Number, min: 100000000, max: 999999999, unique: true, required: true },
    genero: {
        type: String,
        required: true,
        enum: generosPossiveis,
        default: "feminino"
    },
    nome: { type: String, min: 2, max:64, required:true },
    coordenadasDe: { type: String, required: true},
    coordenadasPara: { type: String, required: true},
    status: {
        type: String,
        required: true,
        enum: statusPossiveis,
        default: "pendente"
    }
});

pedidoSchema.virtual('statusPossiveis').get(function() {
    return statusPossiveis;
});

module.exports = mongoose.model("Pedido", pedidoSchema);