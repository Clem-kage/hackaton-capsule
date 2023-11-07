var express = require('express');
var router = express.Router();
const Trajet = require('./../models/trajets')

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
  
  try{
     const target = await Trajet.find({departure: req.body.departure, arrival: req.body.arrival})
     res.status(200).json({message: target})
  }
  catch{
     res.status(400).json({message: 'error'})
  }
})

module.exports = router;
