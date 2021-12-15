const router = require("express").Router();
const nodemailer = require("nodemailer");
let user = require("../Models/users.model");

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

router.route("/:id").get((req, res) => {
  user
    .findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/reservations").get((req, res) => {
  user
    .findById(req.params.id)
    .then((users) => res.json(users.Flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/cancelled").post((req, res) => {
  user.findById(req.params.id).then((users) => {
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

router.route("/:id/reservations/delete").patch((req, res) => {
  user
    .findById(req.params.id)
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

router.route("/:id/reservation/add").patch((req, res) => {
  user
    .findById(req.params.id)
    .then((users) => {
      users.Flights = users.Flights.push(req.body.confirm);
      users
        .save()
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").patch((req, res) => {
  user
    .findById(req.body.id)
    .then((users) => {
      users.Username = req.body.Username;
      users.Password = req.body.Password;
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
