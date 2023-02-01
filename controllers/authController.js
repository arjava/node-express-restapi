const express = require('express')
const bcrypt = require('bcrypt')
var router = express.Router()
const mongoose = require('mongoose')
const Auth = mongoose.model('Auth')
const jwt = require('jsonwebtoken')
let session = require('express-session')

function hashPassword(req, res) {
    console.log("PASSWORD ", req.password)
    console.log("USERNAME ", req.username)
    bcrypt.hash(req.password, 11)
        .then(hash => {
            console.log("HASH ", hash)
            insertRecord(req, res, hash)
        })
        .catch(err => {
            console.log("Error Hashing password " + err)
        })
}

function comparePassword(req, hash, res) {
    bcrypt.compare(req.body.password, hash)
        .then(result => {
            console.log("RESULT ", result)
            if (result) {
                session=req.session
                session.userid=req.body.username
                console.log(req.session)
                res.redirect("/home")
            }else {
                res.send("Wrong Password or Email")
            }
        })
        .catch(err => {
            console.log("Error matching password " + err)
        })
}

function insertRecord(req, res, hash) {
    console.log("MASUK GA INSERT")
    var auth = new Auth()
    auth.username = req.username
    auth.password = hash
    console.log(auth)
    auth.save((err, doc) => {
        if (!err) {
            res.redirect('/auth/login')
        } else {
            console.log("Error during insert: " + err)
        }
    })
}

router.get("/login", (req, res) => {
    res.render('auth/login', {
        viewTitle: "Login User"
    })
})

router.post("/login", (req, res) => {
    Auth.find({ username: req.body.username }, (err, doc) => {
        console.log("DOC ", doc)
        if (!err) {
            // jwt.sign({ auth: doc }, "arjavKey", (err, token) => {
                // res.json({ token: token })
            //     console.log("TOKEN : "+token)
            // })
            comparePassword(req, doc[0].password, res)
        } else {
            res.send("Ops durung ano data kuen ng kene.")
        }
    })
})

router.get("/register", (req, res) => {
    res.render('auth/register', {
        viewTitle: "Register User"
    })
})

router.post("/register", (req, res) => {
    console.log("KENA GA URL")
    hashPassword(req.body, res)
})

module.exports = router