// modelo mongoose para Táxis 

const mongoose = require("mongoose");

const taxiSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(?!^\d+$)(?!^[A-Za-z]+$)[A-Za-z0-9-]{5,10}$/.test(v);
      },
      message: "Matrícula inválida!"
    }
  },
  marca: {
    type: String,
    enum: ["Toyota", "Renault", "BMW"],
    required: true
  },
  modelo: {
    type: String,
    enum: ["Corolla", "Clio", "Série 3"],
    required: true
  },
  anoDeCompra: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v <= new Date().getFullYear();
      },
      message: "Ano de compra inválido!"
    }
  },
  conforto: {
    type: String,
    enum: ["básico", "luxuoso"],
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Taxi", taxiSchema);
