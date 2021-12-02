// 1. Importamos mongoose
const mongoose = require("mongoose");

//var review = mongoose.model("review");

// 2. Aquí definimos el esquema de un todo
const diarySchema = new mongoose.Schema(
  {
    watching: [
      {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: "elements",
      },
    ],
    completed: [
      {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: "elements",
      },
    ],
    dropped: [
      {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: "elements",
      },
    ],
    pending: [
      {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: "elements",
      },
    ],
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

// 3.
// user => nombre del recurso que podemos guardar en la bd
const DIARYmodel = mongoose.model("diary", diarySchema);

// 4. Exportamos el modelo
module.exports = DIARYmodel;
