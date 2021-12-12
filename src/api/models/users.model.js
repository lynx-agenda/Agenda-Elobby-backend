// 1. Importamos mongoose
const mongoose = require("mongoose");

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
      validate: {
        validator: function (email) {
          var EMAIL_REGEX =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          return EMAIL_REGEX.test(email);
        },
        message: "El correo electrónico no tiene un formato válido",
      },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "diary",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    tierlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tierlist",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 3.
// user => nombre del recurso que podemos guardar en la bd
const USERmodel = mongoose.model("user", userSchema);

// 4. Exportamos el modelo
module.exports = USERmodel;
