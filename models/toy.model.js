const mongoose = require('mongoose');
var validator = require("email-validator");

var toySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required'
    },
    amount: {
        type: String,
        required: 'This field is required'
    },
    price: {
        type: String,
        required: 'This field is required'
    },
    company: {
        type: String,
        required: 'This field is required'
    }
})

// custom validation for email

mongoose.model('Toy', toySchema);