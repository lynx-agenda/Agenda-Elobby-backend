// 1. Importamos mongoose
const mongoose = require("mongoose");

//var review = mongoose.model("review");

// 2. Aquí definimos el esquema de un todo
const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    email: {
      required: true,
      type: String,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    username: {
      required: true,
      type: String,
      minlength: 3,
      maxlength: 100,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    diary: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: "diary",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  { timestamps: true }
);

// 3.
// user => nombre del recurso que podemos guardar en la bd
const USERmodel = mongoose.model("user", userSchema);

// 4. Exportamos el modelo
module.exports = USERmodel;
