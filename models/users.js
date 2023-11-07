const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: String,
    reservations: [{ editor: { type: mongoose.Schema.Types.ObjectId, ref: 'trajets' }}]
})

const User = mongoose.model('users', userShema);

module.exports = User;