const mongoose = require('mongoose')

var movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This file is required'
    },
    director: {
        type: String,
        required: 'This file is required'
    },
    release: {
        type: String,
        required: 'This file is required'
    }
})

mongoose.model('Movie', movieSchema)