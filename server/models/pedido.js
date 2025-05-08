const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statusPossiveis = ["pendente", "aceite"];

const pedidoSchema = new Schema({
    motorista: {type: Schema.Types.ObjectId, ref: "Motorista"},
    taxi: {type: Schema.Types.ObjectId, ref: "Taxi"},
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
    cliente: {type: Schema.Types.ObjectId, ref: "Cliente", unique: true, required: true},
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

/*
const pedidoSchema = new Schema({
    estado: { type: String, enum: ['PENDENTE', 'ACEITE'], required: true },
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    numeroDePessoas: { type: Number, min: 1, required: true },
    partida: { type: Schema.Types.ObjectId, ref: "Morada", required: true },
    chegada: { type: Schema.Types.ObjectId, ref: "Morada", required: true },
    motorista: { type: String },
    localizacaoMotorista: { type: String },
    taxi: { type: Schema.Types.ObjectId, ref: "Taxi" }
});

/*Se um motorista responder, 
deve ser mostrado 
- o seu nome, 
- a distância a que está, 
- o tempo estimado de chegada até ao cliente e 
- o custo estimado da viagem até ao destino,
- e todos os detalhes do táxi. 
O cliente deve, então, poder aceitar ou rejeitar esse motorista e táxi. 
*/