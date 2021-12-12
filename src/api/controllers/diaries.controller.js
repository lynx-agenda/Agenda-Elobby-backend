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
  return DIARYmodel.findOne({ _id: req.params.idDiary })
    .populate("completed", {
      idApi: 1,
      type: 1,
    })
    .populate("watching", {
      idApi: 1,
      type: 1,
    })
    .populate("dropped", {
      idApi: 1,
      type: 1,
    })
    .populate("pending", {
      idApi: 1,
      type: 1,
    })
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

async function modifyDiary(req, res) {
  if (
    req.body.status !== "watching" &&
    req.body.status !== "completed" &&
    req.body.status !== "dropped" &&
    req.body.status !== "pending" && 
    req.body.status !== "delete"
  ) {
    return res.status(400).json({ msg: "el status no es válido" });
  }

  const diary = await DIARYmodel.findById(req.params.idDiary)
    .populate("watching", {
      _id: 1,
    })
    .populate("completed", {
      _id: 1,
    })
    .populate("dropped", {
      _id: 1,
    })
    .populate("pending", {
      _id: 1,
    });

  diary.watching = diary.watching.filter(
    (element) => element.id != req.body.idElement
  );

  diary.completed = diary.completed.filter(
    (element) => element.id != req.body.idElement
  );

  diary.dropped = diary.dropped.filter(
    (element) => element.id != req.body.idElement
  );

  diary.pending = diary.pending.filter(
    (element) => element.id != req.body.idElement
  );

  if (req.body.status === "watching") {
    diary.watching.push(req.body.idElement);
  }
  if (req.body.status === "completed") {
    diary.completed.push(req.body.idElement);
  }
  if (req.body.status === "dropped") {
    diary.dropped.push(req.body.idElement);
  }
  if (req.body.status === "pending") {
    diary.pending.push(req.body.idElement);
  }
  diary
    .save()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}