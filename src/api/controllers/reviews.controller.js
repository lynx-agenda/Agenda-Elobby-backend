const REVIEWSmodel = require("../models/reviews.model");
const USERmodel = require("../models/users.model");
const ELEMENTmodel = require("../models/element.model");
/**
 *     GET :    /users            getAllReviews
 *     GET :    /users/:email     getOneReview
 *     POST :   /users            createReview
 *     PATCH :  /users            modifyReview
 */

module.exports = {
  getAllReviews,
  getOneReview,
  createReview,
  // modifyReview,
};

function getAllReviews(req, res) {
  return REVIEWSmodel.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function getOneReview(req, res) {
  const { id } = req.params;
  REVIEWSmodel.findById(id)
    .populate("idUser", {
      name: 1,
      email: 1,
      usename: 1,
    })
    .then((review) => {
      return res.json(review);
    })
    .catch((e) => {
      return res.status(500).json(e);
    });
}

async function createReview(req, res) {
  const { text, note, idElement } = req.body;
  const user = await USERmodel.findById(req.params.id);
  const newReview = new REVIEWSmodel({
    text,
    note,
    idElement,
    idUser: req.params.id,
  });

  try {
    const savedReview = await newReview.save();

    user.reviews = user.reviews.concat(savedReview._id);
    await user.save();
    return res.json(savedReview);
  } catch (e) {
    return res.status(500).json(e);
  }
}

// function modifyReview(req, res) {
//   return REVIEWSmodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((results) => {
//       return res.json(results);
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// }
