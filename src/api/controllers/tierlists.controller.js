const TIERLISTmodel = require("../models/tierlist.model");
const DIARYmodel = require("../models/diary.model");
const e = require("express");
/**
 *     GET :    /users            getALL
 *     GET :    /users/:email     getUser
 *     POST :   /users            createUser
 *     PATCH :  /users            modifyUser
 *     DELETE : /users            removeUser
 *
 */

module.exports = {
  getAllTierlist,
  getTierlist,
  createTierlist,
  removeTierlist,
  modifyTierlist,
};

function getAllTierlist(req, res) {
  return TIERLISTmodel.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

function getTierlist(req, res) {
  const userId = req.userId;
  return TIERLISTmodel.find({ idUser: userId })
    .populate("elements", {
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

function removeTierlist(req, res) {
  return TIERLISTmodel.findByIdAndRemove(req.params.id)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

async function createTierlist(userId, category) {
  const newTierlist = await new TIERLISTmodel({
    idUser: userId,
    category,
  });

  await newTierlist.save();

  return newTierlist;
}

async function modifyTierlist(req, res) {
  if (
    req.params.category !== "S" &&
    req.params.category !== "A" &&
    req.params.category !== "B" &&
    req.params.category !== "C" &&
    req.params.category !== "D"
  ) {
    return res.status(400).json({ msg: "La categoría no es válida" });
  }

  try {
    const { elements } = req.body;

    let tierlist = await TIERLISTmodel.find({
      idUser: req.userId,
      category: req.params.category,
    });

    console.log(`tierlist`, tierlist);

    if (!tierlist[0]) {
      tierlist[0] = await createTierlist(req.userId, req.params.category);
    }

    if (elements) {
      tierlist[0].elements = elements;
    }

    const results = await tierlist[0].save();

    return res.json(results);
  } catch (err) {
    console.log(`err`, err);
    return res.status(500).json(err);
  }

  // const diary = await DIARYmodel.find({
  //   idUser: req.userId,
  //   idElement: req.body.idElement,
  // })
  //   .populate("watching", {
  //     _id: 1,
  //     type: 1,
  //   })
  //   .populate("completed", {
  //     _id: 1,
  //     type: 1,
  //   })
  //   .populate("dropped", {
  //     _id: 1,
  //     type: 1,
  //   })
  //   .populate("pending", {
  //     _id: 1,
  //     type: 1,
  //   });
  // // console.log(`diary[0].completed`, diary[0].completed.length);
  // // console.log(`diary.watching`, diary[0].watching);
  // // console.log(`diary.dropped`, diary[0].dropped.length);
  // // console.log(`diary.pending`, diary[0].pending);
  // // console.log(`tierlist[0]`, tierlist[0]);

  // let contadorElementoEnDiary = 0;

  // for (let i = 0; i < diary[0].dropped.length; i++) {
  //   if (diary[0].dropped[i].id === req.body.idElement) {
  //     contadorElementoEnDiary++;
  //   }
  // }
  // for (let i = 0; i < diary[0].completed.length; i++) {
  //   if (diary[0].completed[i].id === req.body.idElement) {
  //     contadorElementoEnDiary++;
  //   }
  // }
  // for (let i = 0; i < diary[0].watching.length; i++) {
  //   if (diary[0].watching[i].id === req.body.idElement) {
  //     contadorElementoEnDiary++;
  //   }
  // }
  // for (let i = 0; i < diary[0].pending.length; i++) {
  //   if (diary[0].pending[i].id === req.body.idElement) {
  //     contadorElementoEnDiary++;
  //   }
  // }
  // tierlist[0].elements = tierlist[0].elements.filter(
  //   (element) => element._id != req.body.idElement
  // );

  // let contadorElementoEnTierlist = 0;

  // const AllTierListUser = await TIERLISTmodel.find({
  //   userId: req.userId,
  //   idElement: req.body.idElement,
  // });

  // // console.log(`AllTierListUser`, AllTierListUser);
  // AllTierListUser.forEach((element) => {
  //   let elemento = element.elements;

  //   elemento.forEach((element) => {
  //     // console.log(`element`, JSON.stringify(element));
  //     console.log(JSON.stringify(element).replace('"', "").replace('"', ""));
  //     console.log(req.body.idElement);
  //     if (
  //       JSON.stringify(element).replace('"', "").replace('"', "") ===
  //       req.body.idElement
  //     ) {
  //       contadorElementoEnTierlist++;
  //     }
  //   });
  //   // console.log(`elemento`, elemento);
  //   // console.log(`element.elements`, element.elements);
  // });
  // console.log(`contadorElementoEnTierlist`, contadorElementoEnTierlist);

  // if (contadorElementoEnDiary === 0) {
  //   return res.status(404).json({ msg: "El elemento no está en tu diario" });
  // } else {
  //   if (contadorElementoEnTierlist >= 1) {
  //     return res
  //       .status(409)
  //       .json({ msg: "El elemento seleccionado ya está en tu tierlist" });
  //   } else {
  //     if (req.params.category === "S") {
  //       tierlist[0].elements.push(req.body.idElement);
  //     }
  //     if (req.params.category === "A") {
  //       tierlist[0].elements.push(req.body.idElement);
  //     }
  //     if (req.params.category === "B") {
  //       tierlist[0].elements.push(req.body.idElement);
  //     }
  //     if (req.params.category === "C") {
  //       tierlist[0].elements.push(req.body.idElement);
  //     }
  //     if (req.params.category === "D") {
  //       tierlist[0].elements.push(req.body.idElement);
  //     }
  //   }
  // }

  // tierlist[0]
  //   .save()
  //   .then((results) => {
  //     return res.json(results);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json(err);
  //   });

  // console.log(`diary`, diary);
  // return res.json(diary);
}
