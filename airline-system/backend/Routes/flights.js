const router = require('express').Router();
let Flight = require('../models/flights.model');

router.route('/').get((req, res)=>{
    Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req, res)=>{
const from = req.body.from;

const to = req.body.to;

const flight_date

});