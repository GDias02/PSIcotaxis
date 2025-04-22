const mongoose = require("mongoose");

const niveisDeConforto = ["basico", "luxuoso"];

const taxiSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 12,
    validate: {
      validator: function (v) {
        const temLetra = /[A-Za-z]/.test(v);
        const temNumero = /\d/.test(v);
        return temLetra && temNumero;
      },
      message: "A matrícula deve conter letras e números."
    }
  },
  marca: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64
  },
  modelo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64
  },
  anoDeCompra: {
    type: Date, 
    required: true,
    validate: {
      validator: function (v) {
        return v.getFullYear() >= 1900 && v <= new Date();
      },
      message: "O ano de compra deve ser maior ou igual a 1900 e não pode ser no futuro."
    }
  },
  conforto: {
    type: String,
    enum: niveisDeConforto,
    required: true,
    default: "basico"
  },
  registo: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Taxi", taxiSchema);
