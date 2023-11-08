var express = require('express');
var router = express.Router();
const Trajet = require('./../models/trajets')
var moment = require('moment'); // require
/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const allTrajets = await Trajet.find();
    res.status(200).json({massage: allTrajets})
  }
  catch{
    res.status(400).json({message: 'error'})
  }
  // res.render('index', { title: 'Express' });
});


router.post('/', async function(req, res, next){
  let  day = new Date(req.body.date).toLocaleDateString("fr")
  let  local = new Date(req.body.date)
  console.log((day))
  // console.log({departure: req.body.departure, arrival: req.body.arrival, date: moment(new Date(req.body.date).toString()).format() })
  try{
     const target = await Trajet.find({departure: req.body.departure, arrival: req.body.arrival, date: new Date(req.body.date)})
     res.status(200).json({message: target})
  }
  catch{
     res.status(400).json({message: 'No trip found'})
  }
})

module.exports = router;
