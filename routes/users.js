var express = require('express');
var router = express.Router();
const User = require('../models/users');



router.post('/', async function(req, res, next){
    const newUser = new ({
        name: req.body.name, 
        reservations: []
    })

    newUser.save()
    .then((data)=> {
        res.status(200).json({
            newUser: data
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message: 'error'
        })
    })
})

router.post('/', async function(req, res, next){
    const userDisplayed = await User.find({name: req.body.name}).populate('reservations');
    const allReservations = userDisplayed.reservations;
    if(!allReservations.includes(req.body.reservation)){
      User.updateOne({name: req.body.name,  $push: {reservations: req.body.reservation}})
      .then((data)=>{
        res.status(200).json({
            message: data
        })
      })
      .catch((err)=>{
        res.status(400).json({
            message: 'error'
        })
      })
    }
    else{
        return 
    }
})

module.exports = router
