// 1. Importamos mongoose
const mongoose = require("mongoose");

//var review = mongoose.model("review");

// 2. Aquí definimos el esquema de un todo
const diarySchema = new mongoose.Schema(
  {
    watching: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "element",
      },
    ],
    completed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "element",
      },
    ],
    dropped: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "element",
      },
    ],
    pending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "element",
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
