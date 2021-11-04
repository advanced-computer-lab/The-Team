const router = require('express').Router();
let Flight = require('../models/flights.model');

router.route('/').get((req, res)=>{
    Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
const From = req.body.From;
const To = req.body.To;
const Flight_date = DATE.parse(req.body.Flight_date);
const Cabin = req.body.Cabin;
const Seats = Number(req.body.Seats);

const newFlight =new Flight({From,To,Flight_date,Cabin,Seats})

Flight.save()
.then(()=>res.json('Flight Added!'))
.catch(err=> res.status(400).json('Error '+err));
});

module.exports= router;