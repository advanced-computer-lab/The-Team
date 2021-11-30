const router = require("express").Router();
let Flight = require("../models/flights.model");

router.route("/search").post(async (req, res) => {
  const From = req.body.From;
  const To = req.body.To;
  const DepartureDate = req.body.DepartureDate;
  const ReturnDate = req.body.ReturnDate;
  const docs = await Flight.find({
    From: From,
    To: To,
    Flight_date: DepartureDate,
  }).exec();
  if (docs.length>0) {
    const docs2 = await Flight.find({
      From: To,
      To: From,
      Flight_date: ReturnDate,
    }).exec();
    if (docs2.length>0) {
      res.json({ departure: docs, return: docs2 });
    } else {
      res.sendStatus(204);
    }
  } else {
    res.sendStatus(204);
  }
});

router.route("/").get((req, res) => {
  console.log(req);
  Flight.find()
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const From = req.body.From;
  const To = req.body.To;
  const Flight_date = req.body.Flight_date;
  const Economy_seats = Number(req.body.Economy_seats);
  const Business_seats = Number(req.body.Business_seats);
  const First_seats = Number(req.body.First_seats);

  const newFlight = new Flight({
    From,
    To,
    Flight_date,
    Economy_seats,
    Business_seats,
    First_seats,
  });

  newFlight
    .save()
    .then(() => res.json("Flight Added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").get((req, res) => {
  Flight.findById(req.params.id)
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/delete").delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.json("Flight deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").patch((req, res) => {
  Flight.findById(req.body.id)
    .then((flights) => {
      flights.From = req.body.From;
      flights.To = req.body.To;
      flights.Flight_date = req.body.Flight_date;
      flights.Economy_seats = Number(req.body.Economy_seats);
      flights.Business_seats = Number(req.body.Business_seats);
      flights
        .save()
        .then(() => res.json("Flight updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
