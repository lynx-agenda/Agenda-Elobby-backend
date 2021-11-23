const USERmodel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/**
 *     GET :    /users            getALL
 *     GET :    /users/:email     getUser
 *     POST :   /users            createUser
 *     PATCH :  /users            modifyUser
 *     DELETE : /users            removeUser
 *
 */

module.exports = {
  getAll,
  getUser,
  createUser,
  removeUser,
  modifyUser,
  signUp,
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
        console.log("1");
        bcrypt.hash(password, salt, function (err, hash) {
          console.log("2");
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
                  console.log("3");
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

function getAll(req, res) {
  return USERmodel.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function getUser(req, res) {
  return USERmodel.findOne({ email: req.params.email })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function createUser(req, res) {
  return USERmodel.create(req.body)
    .then((results) => {
      return res.status(201).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function removeUser(req, res) {
  return USERmodel.findByIdAndRemove(req.params.id)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function modifyUser(req, res) {
  return USERmodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}
