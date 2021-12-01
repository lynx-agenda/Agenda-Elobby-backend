const DIARYmodel = require("../models/diary.model");

/**
 *     GET :    /users            getALL
 *     GET :    /users/:email     getUser
 *     POST :   /users            createUser
 *     PATCH :  /users            modifyUser
 *     DELETE : /users            removeUser
 *
 */

module.exports = {
  getAllDiaries,
  getDiary,
  createDiary,
  removeDiary,
  modifyDiary,
};

function getAllDiaries(req, res) {
  // return DIARYmodel.find()
  //   .populate("reviews", {
  //     text: 1,
  //     note: 1,
  //     _id: 0,
  //   })
  //   .then((results) => {
  //     return res.json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });
}

function getDiary(req, res) {
  // return DIARYmodel.findOne({ email: req.params.email })
  //   .then((results) => {
  //     return res.json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });
}

function createDiary(req, res) {
  // return DIARYmodel.create(req.body)
  //   .then((results) => {
  //     return res.status(201).json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });
}

function removeDiary(req, res) {
  // return DIARYmodel.findByIdAndRemove(req.params.id)
  //   .then((results) => {
  //     return res.json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });
}

function modifyDiary(req, res) {
  // return DIARYmodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  //   .then((results) => {
  //     return res.json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });
}
