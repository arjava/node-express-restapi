const mongoose = require('mongoose')

var authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'This file is required'
    },
    password: {
        type: String,
        required: 'This file is required'
    }
})

mongoose.model('Auth', authSchema)