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

module.exports = router;
