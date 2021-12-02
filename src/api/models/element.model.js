// 1. Importamos mongoose
const mongoose = require("mongoose");

//var review = mongoose.model("review");

// 2. Aquí definimos el esquema de un todo
const elementSchema = new mongoose.Schema(
  {
    idElement: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
      enum: ["movie", "tv", "book", "game"],
    },
    idDiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diary",
    },
  },
  { timestamps: true }
);

// 3.
// user => nombre del recurso que podemos guardar en la bd
const ELEMENTmodel = mongoose.model("element", elementSchema);

// 4. Exportamos el modelo
module.exports = ELEMENTmodel;
