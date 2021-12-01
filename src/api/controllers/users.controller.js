const USERmodel = require("../models/users.model");

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
  removeUser,
  modifyUser,
};

/**
 * @returns La lista de usuarios registrados en el sistema
 */
function getAll(req, res) {
  return USERmodel.find()

    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

/**
 * @returns Un usuario registrado en el sistema con el id pasado por parámetro
 */
function getUser(req, res) {
  return USERmodel.findOne({ _id: req.params.id })
    .populate("reviews")
    .populate("diary")
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

/**
 * @returns
 */
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
