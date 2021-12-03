const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reserveSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },

    Confirmation_Number: {
        type: Number,
        required: true,
    },

    Price: {
        type: Number,
        required: true,
    },

    Flight_no:{
        type: Number,
        required: true,
    },

    Flight_id:{
        type: String,
        required: true,
    },

    eSeats:{
        type: [Number],
        required: true,
    },

    bSeats:{
        type: [Number],
        required: true,
    },

    fSeats:{
        type: [Number],
        required: true,
    }

});

const Reserve =mongoose.model('Reserve',reserveSchema);

module.exports= Reserve;