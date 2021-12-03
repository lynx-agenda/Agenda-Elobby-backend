const ELEMENTmodel = require("../models/element.model");
/**
 *     GET :    /users            getALL
 *     GET :    /users/:email     getUser
 *     POST :   /users            createUser
 *     PATCH :  /users            modifyUser
 *     DELETE : /users            removeUser
 *
 */

module.exports = {
  getAllElements,
  getElement,
  createElement,
  removeElement,
  modifyElement,
};

function getAllElements(req, res) {
  return ELEMENTmodel.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function getElement(req, res) {
  return ELEMENTmodel.findOne({ id: req.params.id })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

async function createElement(req, res) {
  const { idApi, type } = req.body;
  const element = await ELEMENTmodel.findOne({
    idApi: idApi,
    type: type,
  });

  if (!element) {
    const element = new ELEMENTmodel({
      idApi,
      type
    });
    const element = await newElement.save();
    return res.json({ success: true, element });
  } else {
    return res.json({ success: true, element });
  }
}

function removeElement(req, res) {
  return ELEMENTmodel.findByIdAndRemove(req.params.id)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function modifyElement(req, res) {
  return ELEMENTmodel.findByIdAndUpdate(req.params.id, {}, { new: true })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}
