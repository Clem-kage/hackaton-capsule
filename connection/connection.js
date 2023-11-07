const mongoose = require("mongoose");

// Insert your connection string inside this variable
// const connectionString = 'mongodb+srv://clemkfr:DBx3lIDV1GD4XtHT@cluster0.ihwegoj.mongodb.net/pokedb';

mongoose.set("strictQuery", true); // Remove Mongoose warning in console

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch(error => console.error(error));


module.exports = connectionString; // Do not edit/remove this line