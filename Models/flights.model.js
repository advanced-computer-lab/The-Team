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

    Dep_date: {
        type: String,
        required: true,
    },

    Arr_date: {
        type: String,
        required: true,
    },

    Dep_time: {
        type: String,
        required: true,
    },

    Arr_time: {
        type: String,
        required: true,
    },

    Economy_seats: {
        type: [Number],
        required: true,
    },

    Business_seats: {
        type: [Number],
        required: true,
    },

    First_seats: {
        type: [Number],
        required: true,
    },

    Flight_no: {
        type: Number,
        required: true,
    },

    Baggage_allowance: {
        type: Number,
        required: true,
    },

    Price: {
        type: Array,
        required: true,
    },

    Dep_terminal: {
        type: Number,
        required: true,
    },

    Arr_terminal: {
        type: Number,
        required: true,
    },

    Trip_duration: {
        type: Number,
        required: true,
    }


});

const Flight =mongoose.model('Flight',flightSchema);

module.exports= Flight;