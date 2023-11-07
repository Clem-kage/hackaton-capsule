const mongoose = require('mongoose');


const trajetShema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number
})

const Trajet = mongoose.model('trajets', trajetShema)

module.exports = Trajet