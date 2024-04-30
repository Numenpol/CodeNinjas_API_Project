const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name and surname"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    lowercase: true, //pavers el pasta mazosiomis raidemis
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    message: "Role must be one of: user, admin",
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this only works on "save" and "create" mongoose methods
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  avatar: {
      type: String,
      default: "avatars/avatar.svg"
    }
});

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//check if the password is correct
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  module.exports = mongoose.model("User", userSchema);
