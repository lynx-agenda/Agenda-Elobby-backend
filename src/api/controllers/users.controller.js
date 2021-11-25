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
  createUser,
  removeUser,
  modifyUser,
};

function getAll(req, res) {
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
