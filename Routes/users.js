const router = require("express").Router();
const nodemailer = require("nodemailer");
let user = require("../Models/users.model");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const stripe = require("stripe")(
  "sk_test_51K8tbEFK05i5y2oRLPqRDqxXrgjH1ExR5XaLJgH8DpkEby8cZEOb8oWKWQhKdVqaklFDaHcrIrqbtSDjAFeH0U6W00ejBG2mve"
);

//const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//app.use(express.json());

router.route("/isAdmin").get(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);

  if (userData.password == "") {
    res.sendStatus(403);
  } else {
    console.log(userData.data.type);
    if (userData.data.type == "Admin") {
      res.send(200, "Admin");
    } else {
      res.send(200, "Not");
    }
  }
});

router.route("/create-payment-intent").post(async (req, res) => {
  var r = req.body.money;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: r,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

async function verifyToken(token) {
  var returnData = {};
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    //console.log(authData);
    if (err) {
      returnData = {
        password: "",
      };
    } else {
      returnData = authData;
    }
  });
  //console.log(returnData);
  return returnData;
}
router.post("/password", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  console.log(userData.data);
  if (userData.password == "") {
    res.sendStatus(403);
  } else {
    console.log(req.body.old);
    console.log(userData.data.password);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.compare(req.body.old, userData.data.password).then((correct) => {
        if (correct) {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            console.log(req.body.password);
            console.log(hash);
            if (err) {
              res.send(err);
            } else {
              console.log(userData.data.email);
              console.log(userData.data.password);
              user
                .findOneAndUpdate(
                  { Email: userData.data.email },
                  { Password: hash }
                )
                .then(res.send(200, "Password changed successfully"));
            }
          });
        } else {
          res.sendStatus(403);
        }
      });
    });
  }
});
router.route("/").get((req, res) => {
  console.log(req);
  user
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Email = req.body.Email;
  const Passport_number = req.body.Passport_number;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const Home_address = req.body.Home_address;
  const Country_code = req.body.Country_code;
  const Telephone_number = req.body.Telephone_number;
  const Flights = req.body.Flights;

  const newUser = new user({
    Username,
    Password,
    Email,
    Passport_number,
    Fname,
    Lname,
    Home_address,
    Country_code,
    Telephone_number,
    Flights,
  });

  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/signup").post((req, res) => {
  const Username = req.body.Username;
  var Password = req.body.Password;
  const Email = req.body.Email;
  const Passport_number = req.body.Passport_number;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const Home_address = req.body.Home_address;
  const Country_code = req.body.Country_code;
  const Telephone_number = req.body.Telephone_number;
  const Flights = [];

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, (err, hash) => {
      if (err) throw err;
      Password = hash;

      const newUser = new user({
        Username,
        Password,
        Email,
        Passport_number,
        Fname,
        Lname,
        Home_address,
        Country_code,
        Telephone_number,
        Flights,
      });

      newUser
        .save()
        .then(() => res.json("User Added!"))
        .catch((err) => res.status(400).json("Error " + err));
    });
  });
});

router.route("/login").post((req, res) => {
  const mail = req.body.Email;

  user.findOne({ Email: mail }, function (err, match) {
    if (!match) {
      return res.json({
        message: "Email not found",
      });
    }
    bcrypt.compare(req.body.Password, match.Password).then((correct) => {
      if (correct) {
        const payload = {
          passno: match.Passport_number,
          email: match.Email,
          password: match.Password,
          id: match._id,
          type: match.Username,
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
              token: token,
            });
          }
        );
      } else {
        return res.json({
          message: "Email and password do not match",
        });
      }
    });
  });
});

router.route("/getuser").get(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);

  user
    .findById(userData.data.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/reservations").get(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);

  user
    .findById(userData.data.id)
    .then((users) => res.json(users.Flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/cancelled").post(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  user.findById(userData.data.id).then((users) => {
    const mail = users.Email;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "acltheteam@gmail.com",
        pass: "Damnpass456",
      },
    });

    let mailDetails = {
      from: "acltheteam@gmail.com",
      to: mail,
      subject: "Test mail",
      text:
        "Hello bro, thank you for using our services hope to see you soon buddy you gave back " +
        req.body.Price +
        " for your reservation with number" +
        req.body.Confirmation_Number +
        " Love you",
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  });
});

router.route("/reservations/delete").patch(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  user
    .findById(userData.data.id)
    .then((users) => {
      console.log(users.Flights);
      var reser = users.Flights;
      var reserIndex = reser.indexOf(req.body.Confirmation_Number);
      reser.splice(reserIndex, 1);
      users.Flights = reser;

      users
        .save()
        .then(() => res.json("reservations updated in user!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/reservation/add").patch(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  user
    .findById(userData.data.id)
    .then((users) => {
      users.Flights = users.Flights.push(req.body.confirm);
      users
        .save()
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/forget").post((req, res) => {
  const mail = req.body.email;
  const newpass = Math.random().toString(36).slice(-8);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newpass, salt, (err, hash) => {
      console.log(hash);
      if (err) {
        res.send(err);
      } else {
        user
          .findOneAndUpdate({ Email: mail }, { Password: hash })
          .then((users) => {
            let mailTransporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "acltheteam@gmail.com",
                pass: "Damnpass456",
              },
            });

            let mailDetails = {
              from: "acltheteam@gmail.com",
              to: mail,
              subject: "your new password",
              text: "Your new password " + newpass,
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) {
                console.log("Error Occurs");
              } else {
                console.log("Email sent successfully");
                res.json("Email sent successfully");
              }
            });
          })
          .catch((err) => {
            res.status(400).json("Error: " + err);
          });
      }
    });
  });
});

router.route("/update").patch(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  user
    .findById(userData.data.id)
    .then((users) => {
      users.Username = req.body.Username;
      users.Email = req.body.Email;
      users.Passport_number = req.body.Passport_number;
      users.Fname = req.body.Fname;
      users.Lname = req.body.Lname;
      users.Home_address = req.body.Home_address;
      users.Country_code = req.body.Country_code;
      users.Telephone_number = req.body.Telephone_number;
      users.Flights = users.Flights;
      users
        .save()
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
