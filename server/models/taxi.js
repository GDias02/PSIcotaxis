const mongoose = require("mongoose");

const taxiSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const temLetra = /[A-Za-z]/.test(v);
        const temNumero = /\d/.test(v);
        return v.length >= 5 && v.length <= 10 && temLetra && temNumero;
      },
      message: "A matrícula deve ter entre 5 e 10 caracteres e conter letras e números."
    }
  },
  marca: {
    type: String,
    enum: ["Toyota", "Renault", "BMW", "Mercedes", "Nissan"],
    required: true
  },
  modelo: {
    type: String,
    enum: ["Corolla", "Clio", "Série 3", "Classe E", "Leaf"],
    required: true
  },
  anoDeCompra: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v <= new Date().getFullYear();
      },
      message: "O ano de compra deve ser anterior ou igual ao ano atual."
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
