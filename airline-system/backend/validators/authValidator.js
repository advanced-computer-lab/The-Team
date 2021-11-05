const { check } = require("express-validator");

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid mail address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 char"),
];
