const express = require("express");
const route = express.Router();
const {
  signin,
  requireSignin,
} = require("../controllers/authController");

//import validator
const { runValidation } = require("../validators");
const {
  userSigninValidator,
} = require("../validators/authValidator");

//pass on controllers
route.post("/signin", userSigninValidator, runValidation, signin);

module.exports = route;

