// 1. Importamos mongoose
const mongoose = require("mongoose");

// 2. Aquí definimos el esquema de un todo
const reviewSchema = new mongoose.Schema(
  {
    text: {
      required: true,
      type: String,
      minlength: 5,
      maxlength: 100,
    },
    note: {
      required: true,
      type: Number,
    },
    idElement: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: "elements",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

// 3.
// review => nombre del recurso que podemos guardar en la bd
const REVIEWSmodel = mongoose.model("review", reviewSchema);

// 4. Exportamos el modelo
module.exports = REVIEWSmodel;
