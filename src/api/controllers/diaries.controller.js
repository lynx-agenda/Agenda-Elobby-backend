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
  // createDiary,
  removeDiary,
  modifyDiary,
};

function getAllDiaries(req, res) {
  return DIARYmodel.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function getDiary(req, res) {
  return DIARYmodel.findOne({ id: req.params.id })
  .populate('watching', 'dropped', 'completed' ,'pending')
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

// function createDiary(req, res) {
//   return DIARYmodel.create(req.body)
//     .then((results) => {
//       return res.status(201).json(results);
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// }

function removeDiary(req, res) {
  return DIARYmodel.findByIdAndRemove(req.params.id)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function modifyDiary(req, res) {
  if (
    req.body.status !== "watching" &&
    req.body.status !== "completed" &&
    req.body.status !== "dropped" &&
    req.body.status !== "pending"
  ) {
    return res.status(400).json({ msg: "el status no es válido" });
  }

  let updateDiary = {};
  if (req.body.status === "watching") {
    updateDiary = {
      watching: req.body.idElement,
    };
  }
  if (req.body.status === "completed") {
    updateDiary = {
      completed: req.body.idElement,
    };
  }
  if (req.body.status === "dropped") {
    updateDiary = {
      dropped: req.body.idElement,
    };
  }
  if (req.body.status === "pending") {
    updateDiary = {
      pending: req.body.idElement,
    };
  }

  return DIARYmodel.findByIdAndUpdate(
    req.params.idDiary,
    {
      $push: updateDiary,
    },
    { new: true }
  )
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}
