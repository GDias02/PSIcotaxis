const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const configSchema = new Schema({
    ppm_basico: { type: Number, min: 0.01, max: 100 },
    ppm_luxuoso: { type: Number, min: 0.01, max: 100 },
    agravamento: { type: Number, min: 0, max: 100 },
});

// Export model
module.exports = mongoose.model("Config", configSchema);