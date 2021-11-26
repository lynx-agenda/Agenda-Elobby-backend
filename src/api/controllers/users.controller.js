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

  if ( !isAdmin(req.locals.dataStored) ) {
    return res.status(401).send("El usuario carece de credenciales válidas para la petición realizada");
  }

  return USERmodel.find()
    .populate("reviews", {
      text: 1,
      note: 1,
      _id: 0,
    })
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

  if ( !checkAuthUserValidity(req.locals.dataStored) ) {
    return res.status(401).send("El usuario carece de credenciales válidas para la petición realizada");
  }

  return USERmodel.findOne({ email: req.params.email })
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

  if ( !checkAuthUserValidity(req.locals.dataStored) ) {
    return res.status(401).send("El usuario carece de credenciales válidas para la petición realizada");
  }

  return USERmodel.findByIdAndRemove(req.params.id)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function modifyUser(req, res) {

  if ( !checkAuthUserValidity(req.locals.dataStored) ) {
    return res.status(401).send("El usuario carece de credenciales válidas para la petición realizada");
  }

  return USERmodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

/**
 * La función verifica que el usuario tiene permiso para realizar la 
 * request. Tendrá permiso siempre que sea userRole==="admin" o 
 * un userRole==="user" que realiza una operación sobre su misma id
 */
function checkAuthUserValidity(dataStored) {
  const userRole = dataStored.userRole;
  const userId = dataStored.userId

  return userRole === "user" && userId == req.params.id 
}

/**
 * La función verifica que el usuario tiene userRole==="admin"
 */
 function isAdmin(dataStored) {
  const userRole = dataStored.userRole;

  console.log(userRole);
  return userRole === "admin"
}