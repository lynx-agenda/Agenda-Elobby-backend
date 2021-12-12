// 1. Importamos mongoose
const mongoose = require("mongoose");

//var review = mongoose.model("review");

// 2. Aquí definimos el esquema de un todo
const tierlistSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: String,
      enum: ["S", "A", "B", "C", "D"],
    },
    elements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "element",
      },
    ],
  },
  { timestamps: true }
);

tierlistSchema.index({ idUser: 1, category: 1 }, { unique: true });

// 3.
// user => nombre del recurso que podemos guardar en la bd
const TIERLISTmodel = mongoose.model("tierlist", tierlistSchema);

// 4. Exportamos el modelo
module.exports = TIERLISTmodel;
