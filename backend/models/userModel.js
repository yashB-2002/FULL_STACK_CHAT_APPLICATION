const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const userModel = mongoose.model("User", schema);
module.exports = userModel;
