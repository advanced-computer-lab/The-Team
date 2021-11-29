const router = require('express').Router();
let Flight = require('../models/flights.model');



router.route('/').get((req, res)=>{
  console.log(req);
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
const From = req.body.From;
const To = req.body.To;
const Dep_date = req.body.Dep_date;
const Arr_date = req.body.Arr_date;
const Dep_time = req.body.Dep_time;
const Arr_time = req.body.Arr_time;
const Economy_seats = Number(req.body.Economy_seats);
const Business_seats = Number(req.body.Business_seats);
const First_seats = Number(req.body.First_seats);
const Flight_no = Number(req.body.Flight_no);
const Baggage_allowance = Number(req.body.Baggage_allowance);
const Price = req.body.Price;
const Dep_terminal = Number(req.body.Dep_terminal);
const Arr_terminal = Number(req.body.Arr_terminal);
const Trip_duration = Number(req.body.Trip_duration);



const newFlight =new Flight({From, To, Dep_date, Arr_date, Dep_time, Arr_time, Economy_seats,Business_seats, First_seats, Flight_no, Baggage_allowance,Price, Dep_terminal, Arr_terminal, Trip_duration })

newFlight.save()
.then(()=>res.json('Flight Added!'))
.catch(err=> res.status(400).json('Error '+err));
});

router.route('/:id').get((req, res) => {
    Flight.findById(req.params.id)
      .then(flights => res.json(flights))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  


  router.route('/:id/delete').delete((req, res) => {
    Flight.findByIdAndDelete(req.params.id)
      .then(() => res.json('Flight deleted.'))
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