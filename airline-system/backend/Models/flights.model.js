const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    From: {
        type: String,
        required: true,
      },

    To: {
        type: String,
        required: true,
    },

    Flight_date: {
        type: String,
        required: true,
    },

    Cabin: {
        type: String,
        required: true,
    },

    Seats: {
        type: Number,
        required: true,
    }
});

const Flight =mongoose.model('Flight',flightSchema);

module.exports= Flight;