const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  name: String,
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "trajets" }],
});
userShema.index({ reservations: 1 }, { unique: true });

const User = mongoose.model("users", userShema);

module.exports = User;
