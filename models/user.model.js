const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This file is required'
    },
    email: {
        type: String,
        required: 'This file is required'
    },
    phone: {
        type: Number,
        required: 'This file is required'
    }
})

mongoose.model('User', userSchema)