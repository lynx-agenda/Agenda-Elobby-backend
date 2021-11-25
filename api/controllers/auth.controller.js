const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USERmodel = require("../models/users.model");
const config = require("../../config");

module.exports = {
  signUp,
  signIn,
};

function signUp(req, res) {
  const user = new USERmodel();

  const { name, username, email, password, repeatPassword } = req.body;
  user.name = name;
  user.username = username;
  user.email = email.toLowerCase();

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ message: "Las contraseñas tienen que ser iguales." });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res
              .status(500)
              .send({ message: "Error al encriptar la contraseña" });
          } else {
            user.password = hash;

            user.save((err, userStored) => {
              if (err) {
                console.log(err);
                res
                  .status(500)
                  .send({ message: "Error al crear el usuario: " + err });
              } else {
                if (!userStored) {
                  res
                    .status(404)
                    .send({ message: "No se ha podido crear el usuario." });
                } else {
                  console.log(hash + " - " + req.body.password);
                  res.status(200).send({ user: userStored });
                }
              }
            });
          }
        });
      });
    }
  }

  const {} = req.body;
}

function signIn(req, res) {
  let { email, password } = req.body;

  email = email.toLowerCase();

  USERmodel.findOne({ email: email })
    .then((usuarioDB) => {
      // Verifica que exista un usuario con el mail escrito por el usuario.
      if (!usuarioDB) {
        return res
          .status(400)
          .json({ message: "Usuario o contraseña incorrectos" });
      }

      // Salt + Hash
      // Compare
      bcrypt.compare(password, usuarioDB.password, function (err, result) {
        // if passwords do not match
        if (err) {
          // handle error
          return res
            .status(400)
            .json({ message: "Usuario o contraseña incorrectos" + err });
        }

        // if passwords match
        if (result) {
          // Genera el token de autenticación
          let token = jwt.sign(
            { usuario: usuarioDB.name, email: usuarioDB.email },
            config.SECRET_KEY
          );

          res.json({
            // usuario: usuarioDB,
            token,
          });
        } else {
          // response is OutgoingMessage object that server response http request
          return res.json({
            success: false,
            message: "passwords do not match",
          });
        }
      });
    })
    .catch((erro) => {
      return res.status(500).json(erro);
    });
}
