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
        type: Date,
        required: true,
    },

    Cabin: {
        type: text,
        required: true,
    },

    Seats: {
        type: Number,
        required: true,
    }
});

const Flight =Mongoose.model('Flight',flightSchema);

module.exports= Flight;