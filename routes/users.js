var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Trajet = require("../models/trajets");

// creation d'utilisateur
router.post("/", async function (req, res, next) {
  const newUser = new User({
    name: req.body.name,
    reservations: [],
  });

  newUser
    .save()
    .then((data) => {
      res.status(200).json({
        newUser: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "error",
      });
    });
});

// ajout de réservation
router.post("/add", async function (req, res, next) {
  const userDisplayed = await User.find({ name: req.body.name }).populate(
    "reservations"
  );
  const allReservations = userDisplayed[0].reservations;
  const targetTrajet = await Trajet.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
  });
  console.log(userDisplayed);
  if (!allReservations.includes(targetTrajet[0]._id)) {
    User.updateOne(
      { name: req.body.name },
      { $push: { reservations: targetTrajet[0]._id.toString() } }
    )
      .then((data) => {
        res.status(200).json({
          message: allReservations,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "error",
        });
      });
  } else {
    return;
  }
});

module.exports = router;
