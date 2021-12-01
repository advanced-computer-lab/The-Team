const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: {
        type: String,
        required: true,
      },

      Password: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Passport_number: {
        type: String,
        required: true,
    },

    Fname: {
        type: String,
        required: true,
    },

    Lname: {
        type: String,
        required: true,
    },

    Home_address: {
        type: String,
        required: true,
    },

    Country_code: {
        type: String,
        required: true,
    },

    Telephone_number: {
        type: Array,
        required: true,
    },

    Flights: {
        type: Array,
        required: true,
    }


});

const users =mongoose.model('users',userSchema);

module.exports= users;