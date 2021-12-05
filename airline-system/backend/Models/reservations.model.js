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

    Arr_Flight_no:{
        type: Number,
        required: true,
    },

    Dep_Flight_id:{
        type: String,
        required: true,
    },

    Dep_Flight_no:{
        type: Number,
        required: true,
    },

    Arr_Flight_id:{
        type: String,
        required: true,
    },

    Arr_eSeats:{
        type: [Number],
        required: true,
    },

    Arr_bSeats:{
        type: [Number],
        required: true,
    },

    Arr_fSeats:{
        type: [Number],
        required: true,
    },

    Dep_eSeats:{
        type: [Number],
        required: true,
    },

    Dep_bSeats:{
        type: [Number],
        required: true,
    },

    Dep_fSeats:{
        type: [Number],
        required: true,
    }

});

const Reserve =mongoose.model('Reserve',reserveSchema);

module.exports= Reserve;