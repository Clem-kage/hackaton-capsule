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
const reqUser = await User.findOne({
  name: req.body.name
}).populate('reservations');

const resas = reqUser.reservations
console.log(resas)


const targettedTrajet = await Trajet.findOne({
  departure: req.body.departure,
  arrival: req.body.arrival,
  date: new Date(req.body.date)
  })
  const heureDeDepart = `${new Date(req.body.date).getHours()}h${new Date(req.body.date).getMinutes()}` 
  console.log(heureDeDepart)
  
  
if(!targettedTrajet){
  res.status(400).json({
    message: "no target"
  })
}
else{
  const display ={
    start: targettedTrajet.departure,
    arrive: targettedTrajet.arrival,
    startHour: heureDeDepart,
    price: targettedTrajet.price,
  }
  res.status(200).json({
    targettedTrajet, display
  })

  const existantId = resas.find((el)=> {
    console.log('el ===', el._id)
    console.log('target ===', targettedTrajet._id)
    return el._id.toString() === targettedTrajet._id.toString()})
  if(!existantId){
    console.log(existantId)
  User.updateOne({
    name: req.body.name
  }, 
  { $push: {reservations:  targettedTrajet._id}})
  .then((data)=>{ 
    console.log('ok', data)
    res.status(200).json({message: 'new trajet', display})
  })
  .catch((err)=>{
    console.log('error')
    res.status(200).json({message: 'trajet déja enregistré'})

  })
}
else{
  console.log('error')
  return 
}




// console.log(reqUser);
   
}
});



router.delete("/del", async function (req, res, next) {

const reqUser = await User.findOne({
  name: req.body.name
}).populate('reservations');

let resas = reqUser.reservations;

const targettedTrajet = await Trajet.findOne({
  departure: req.body.departure,
  arrival: req.body.arrival,
  date: new Date(req.body.date)
  })

const existantId = resas.find((el)=> {
    console.log('el ===', el._id)
    console.log('target ===', targettedTrajet._id)
    return el._id.toString() === targettedTrajet._id.toString()})

if(!existantId){
  return 
}
else{
  User.updateOne({
    name: req.body.name
  }, 
  { $pull: {reservations:  targettedTrajet._id}})
  .then((data)=>{
    resas = reqUser.reservations
    res.status(200).json({
      resas
    })
  })
}





})
module.exports = router;
