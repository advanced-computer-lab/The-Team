const router = require("express").Router();
let Flight = require("../Models/flights.model");

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
      res.json(
        {
          departure: docs,
          arrival: docs2
         }
        );
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


router.route('/add').post((req, res)=>{
const From = req.body.From;
const To = req.body.To;
const Dep_date = req.body.Dep_date;
const Arr_date = req.body.Arr_date;
const Dep_time = req.body.Dep_time;
const Arr_time = req.body.Arr_time;
const Economy_seats = Array(Number(req.body.Economy_seats)).fill(1);
const Business_seats = Array(Number(req.body.Business_seats)).fill(1);
const First_seats = Array(Number(req.body.First_seats)).fill(1);
const Flight_no = Number(req.body.Flight_no);
const Baggage_allowance = Number(req.body.Baggage_allowance);
const Price = req.body.Price;
const Dep_terminal = Number(req.body.Dep_terminal);
const Arr_terminal = Number(req.body.Arr_terminal);
const Trip_duration = Number(req.body.Trip_duration);



const newFlight =new Flight({From, To, Dep_date, Arr_date, Dep_time, Arr_time, Economy_seats,Business_seats, First_seats, Flight_no, Baggage_allowance,Price, Dep_terminal, Arr_terminal, Trip_duration })

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

router.route("/cancelledarr").patch((req, res) => {
  Flight.findById(req.body.Arr_Flight_id)
  .then(flights => {

    for (let i = 0; i < req.body.Arr_eSeats.length; i++) {
      flights.Economy_seats.splice(req.body.Arr_eSeats, 1, 1);
      console.log(flights.Economy_seats)
    }

    for (let i = 0; i < req.body.Arr_bSeats.length; i++) {
      flights.Business_seats.splice(req.body.Arr_bSeats, 1, 1);
    }

    for (let i = 0; i < req.body.Arr_fSeats.length; i++) {
      flights.First_seats.splice(req.body.Arr_fSeats, 1, 1);
    }

    flights.save()
      .then(() => res.json('Flight updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

});

router.route("/cancelleddep").patch((req, res) => {
  Flight.findById(req.body.Dep_Flight_id)
  .then(flights => {
    for (let i = 0; i < req.body.Dep_eSeats.length; i++) {
      flights.Economy_seats.splice(req.body.Dep_eSeats, 1, 1);
      console.log(flights.Economy_seats)
    }

    for (let i = 0; i < req.body.Dep_bSeats.length; i++) {
      flights.Business_seats.splice(req.body.Dep_bSeats, 1, 1);
    }

    for (let i = 0; i < req.body.Dep_fSeats.length; i++) {
      flights.First_seats.splice(req.body.Dep_fSeats, 1, 1);
    }

    flights.save()
      .then(() => res.json('Flight updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

});
router.route("/addedarr").patch((req, res) => {
  Flight.findById(req.body.Arr_Flight_id)
  .then(flights => {

    for (let i = 0; i < req.body.Arr_eSeats.length; i++) {
      flights.Economy_seats.splice(req.body.Arr_eSeats, 1, 0);
      console.log(flights.Economy_seats)
    }

    for (let i = 0; i < req.body.Arr_bSeats.length; i++) {
      flights.Business_seats.splice(req.body.Arr_bSeats, 1, 0);
    }

    for (let i = 0; i < req.body.Arr_fSeats.length; i++) {
      flights.First_seats.splice(req.body.Arr_fSeats, 1, 0);
    }

    flights.save()
      .then(() => res.json('Flight updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

});
router.route("/addeddep").patch((req, res) => {
  Flight.findById(req.body.Dep_Flight_id)
  .then(flights => {
    for (let i = 0; i < req.body.Dep_eSeats.length; i++) {
      flights.Economy_seats.splice(req.body.Dep_eSeats, 1, 0);
      console.log(flights.Economy_seats)
    }

    for (let i = 0; i < req.body.Dep_bSeats.length; i++) {
      flights.Business_seats.splice(req.body.Dep_bSeats, 1, 0);
    }

    for (let i = 0; i < req.body.Dep_fSeats.length; i++) {
      flights.First_seats.splice(req.body.Dep_fSeats, 1, 0);
    }

    flights.save()
      .then(() => res.json('Flight updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

});

  router.route('/update').patch((req, res) => {
    Flight.findById(req.body.id)
      .then(flights => {
        flights.From = req.body.From;
        flights.To = req.body.To;
        flights.Dep_date = req.body.Dep_date;
        flights.Arr_date = req.body.Arr_date;
        flights.Dep_time = req.body.Dep_time;
        flights.Arr_time = req.body.Arr_time;
        flights.Economy_seats = Number(req.body.Economy_seats);
        flights.Business_seats = Number(req.body.Business_seats);
        flights.First_seats = Number(req.body.First_seats);
        flights.Flight_no = Number(req.body.Flight_no);
        flights.Baggage_allowance = Number(req.body.Baggage_allowance);
        flights.Price = req.body.Price;
        flights.Dep_terminal = Number(req.body.Dep_terminal);
        flights.Arr_terminal = Number(req.body.Arr_terminal);
        flights.Trip_duration = Number(req.body.Trip_duration);

        flights.save()
          .then(() => res.json('Flight updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports= router;
