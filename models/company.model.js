const mongoose = require('mongoose');
var validator = require("email-validator");

var comSchema = new mongoose.Schema({
    comName: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    city: {
        type: String,
        required: 'This field is required'
    },
    mobile: {
        type: String,
        required: 'This field is required'
    }
})

// custom validation for email

comSchema.path('email').validate((val) => {
    return validator.validate(val);
}, 'Invalid Email');

mongoose.model('Company', comSchema);