const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Userschema = new Schema({
    full_name: {
      type: String,
      required: [true, "First Name is Required"],
    },
    email: {
      type: String,
      required: [true, "email Name is Required"],
    },
    bio: {
      type: String,
      required: false,
    },
    pronounce: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    date_registered: {
      type: Date,
      default: Date.now(),
    },
    avatar: {
      type: String,
      default: null
    },
  });

const User = mongoose.model("User", Userschema);
module.exports = User;