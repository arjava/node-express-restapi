const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

router.get("/", (req, res)=>{
    res.render('movie/addOrEdit', {
        viewTitle: "Insert Movie"
    })
})

router.post("/", (req, res)=> {
    console.log("KENA GA URL")
    if(req.body._id == ""){
        insertRecord(req, res)
    }else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {
    console.log("MASUK GA INSERT")
    var movie = new Movie()
    movie.title = req.body.title
    movie.director = req.body.director
    movie.release = req.body.release_date
    console.log(movie)
    movie.save((err, doc)=>{
        if(!err){
            res.redirect('movie/list')
        } else {
            console.log("Error during insert: "+ err)
        }
    })
}

function updateRecord(req, res) {
    Movie.findOneAndUpdate(
        {_id: req.body._id},
        req.body,
        {new: true},
        (err, doc)=>{
            if(!err){
                res.redirect("movie/list")
            } else {
                console.log("Error during update: "+ err)
            }
        }
    )
}

router.get("/list", (req, res)=>{
    Movie.find((err, docs)=>{
        if(!err){
            res.render("movie/list", {
                list: docs
            })
            console.log(docs)
        } else {
            console.log("Error in retrieval: "+ err)
        }
    })
})

router.get("/:id", (req, res)=>{
    Movie.findById(req.params._id, (err, doc)=>{
        if(!err){
            res.render("movie/addOrEdit", {
                viewTitle: "Update Movie",
                movie: doc
            })
            console.log(doc)
        }
    })
})

router.get("/delete/:id", (req, res)=>{
    Movie.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect("/movie/list")
        } else {
            console.log("Error in deletion "+ err)
        }
    })
})

module.exports = router