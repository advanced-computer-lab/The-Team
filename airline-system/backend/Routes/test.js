const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
let Test = require("../models/test.model");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const user = req.body;
  const takenUser = await Test.findOne({ username: req.body.user });
  const takenEmail = await Test.findOne({ email: req.body.email });

  if (takenUser || takenEmail) {
    res.status(400).send("User already exists");
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const dbUser = new Test({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });
    dbUser.save();
    res.json({ message: "Success" });
  }
});
router.post("/login", async (req, res) => {
  const userlogging = req.body;

  Test.findOne({
    username: userlogging.username.toLowerCase(),
  }).then((dbUser) => {
    if (!dbUser) {
      res.status(400).send("User not found");
    }
    bcrypt.compare(userlogging.password, dbUser.password).then((match) => {
      if (match) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              return res.status(400).json({ message: err });
            }
            return res.json({
                message: "Success",
                token: "Bearer "+ token
            })
          }
        );
      }
      else{
          return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
