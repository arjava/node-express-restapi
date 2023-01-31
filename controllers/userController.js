const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get("/", (req, res)=>{
    res.render('user/addOrEdit', {
        viewTitle: "Insert User"
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
    var user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    console.log(user)
    user.save((err, doc)=>{
        if(!err){
            res.redirect('user/list')
        } else {
            console.log("Error during insert: "+ err)
        }
    })
}

function updateRecord(req, res) {
    User.findOneAndUpdate(
        {_id: req.body._id},
        req.body,
        {new: true},
        (err, doc)=>{
            if(!err){
                res.redirect("user/list")
            } else {
                console.log("Error during update: "+ err)
            }
        }
    )
}

router.get("/list", (req, res)=>{
    User.find((err, docs)=>{
        if(!err){
            res.render("user/list", {
                list: docs
            })
            console.log(docs)
        } else {
            console.log("Error in retrieval: "+ err)
        }
    })
})

router.get("/:id", (req, res)=>{
    User.findById(req.params._id, (err, doc)=>{
        if(!err){
            res.render("user/addOrEdit", {
                viewTitle: "Update User",
                movie: doc
            })
            console.log(doc)
        }
    })
})

router.get("/delete/:id", (req, res)=>{
    User.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect("/user/list")
        } else {
            console.log("Error in deletion "+ err)
        }
    })
})

module.exports = router