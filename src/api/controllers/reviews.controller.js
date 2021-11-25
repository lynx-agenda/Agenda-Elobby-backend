const REVIEWSmodel = require("../models/reviews.model");
const USERmodel = require("../models/users.model");
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
  modifyReview,
};

function getAllReviews(req, res) {
  //   console.log(res);
  //   const reviews = await REVIEWSmodel.find({});
  //   console.log(reviews);
  //   return res.json(reviews);
  // ---------------------
  return REVIEWSmodel.find()
    .then((results) => {
      console.log(results);
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
  //   return REVIEWSmodel.findOne(req.params.id)
  //     .then((results) => {
  //       return res.json(results);
  //     })
  //     .catch((err) => {
  //       return res.status(500).json(err);
  //     });
}

async function createReview(req, res) {
  const { text, note, idUser } = req.body;
  const user = await USERmodel.findById(idUser);
  const newReview = new REVIEWSmodel({
    text,
    note,
    idUser: user._id,
  });
  console.log(newReview);
  try {
    const savedReview = await newReview.save();

    user.reviews = user.reviews.concat(savedReview._id);
    await user.save();
    response.json(savedReview);
  } catch (e) {
    return res.status(500).json(e);
  }

  //   return REVIEWSmodel.create(req.body.idUser)
  //     .then((results) => {
  //       console.log(req.body.idUser);
  //       return res.status(201).json(results);
  //     })
  //     .catch((err) => {
  //       return res.status(500).json(err);
  //     });
}

function modifyReview(req, res) {
  return REVIEWSmodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}
