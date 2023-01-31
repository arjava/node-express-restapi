const mongoose = require('mongoose')

mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017/MoviesDB', {
    useNewUrlParser: true
},
err => {
    if(!err){
        console.log("Connection DB succeded")
    } else {
        console.log("Connection DB error", err)
    }
})

require('./movie.model')
require('./user.model')