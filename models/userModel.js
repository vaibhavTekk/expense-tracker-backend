const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a name"],
  },
  email: {
    type: String,
    required: [true, "Enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
  },
});

module.exports = mongoose.model("User", userModel);
