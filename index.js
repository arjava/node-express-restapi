require("./models/db")

const { randomUUID } = require('crypto')
const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const handleBars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')
const cookieParser = require("cookie-parser")
let session = require('express-session')

const authController = require("./controllers/authController")
const userController = require("./controllers/userController")
const movieController = require("./controllers/movieController")

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
const port = 3000
const oneDay = 1000 * 60 * 60 * 24
app.listen(port, () => console.log(`Server melayu ning port ${port}`))
app.use(session({
    secret: randomUUID(),
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(express.static(__dirname))
app.use(cookieParser())

app.use("/auth", authController)
app.use("/user", userController)
app.use("/movie", movieController)

// let movies = [
//     {
//         id: randomUUID(),
//         title: "Interception",
//         director: "Christoper Noland",
//         release_date: "2010-07-06"
//     },
//     {
//         id: randomUUID(),
//         title: "The Irishman",
//         director: "Maritne Scrosese",
//         release_date: "2029-07-29"
//     }
// ]

// let users = [
//     {
//         id: randomUUID(),
//         name: "arjava",
//         email: "arjava379@gmail.com"
//     },
//     {
//         id: randomUUID(),
//         name: "arjavax",
//         email: "arjavax@gmail.com"
//     }
// ]

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization']

//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1]
//         req.token = bearerToken
//         next()
//     } else {
//         res.sendStatus(403)
//     }
// }

app.get("/", (req, res) => {
    session = req.session
    if (session.userid) {
        res.redirect('/home')
    } else {
        res.redirect('/auth/login')
    }
})

app.get("/logout", (req, res) => {
    console.log("LOGOUTED")
    req.session.destroy()
    res.redirect("/")
})

app.get("/home", (req, res) => {
    // jwt.verify(req.token, "arjavKey", (err, authData) => {
    // if (err) {
    // res.sendStatus(403)
    // console.log("Oro duwe akses iroku")
    // res.redirect("auth/login")
    // } else {
    // movies.push(movie)
    // res.json({ msg: "Movie is added to the list", user: movie })
    //     res.send(
    //         `<h2>Welcome to the Database!!<h2/>
    //         <h3>Click here to get access to the <b><a href="/movie/list">Database Movies</a></b></h3><br/></br></br>
    //         <h3>Click here to get access to the <b><a href="/user/list">Database Users</a></b></h3>`
    //     )
    // }
    // })
    session = req.session
    if (session.userid) {
        res.send(
            `<h2>Welcome to the Database!!<h2/>
            <h3>Click here to get access to the <b><a href="/movie/list">Database Movies</a></b></h3><br/></br></br>
            <h3>Click here to get access to the <b><a href="/user/list">Database Users</a></b></h3><br/></br></br>
            <h3>Click here to <b><a href="/logout">Logout</a></b></h3>`
        )
    } else {
        res.redirect("auth/login")
    }
})

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handleBars),
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs')

// app.post("/login", (req, res) => {
//     const found = users.some((user) => req.body.email === user.email)

//     if (found) {
//         console.log("MASUK")
//         for (let account of users) {
//             console.log("AKUN ", account)
//             if (account.email === req.body.email) {
//                 jwt.sign({ user: account }, "arjavKey", (err, token) => {
//                     res.json({ token: token })
//                 })
//                 console.log("AKUN ", account)
//                 return
//             }
//         }
//     } else {
//         res.json({ msg: "Ops you aren't registered" })
//     }
// })

// app.get("/movies", verifyToken, (req, res) => {
//     res.json(movies)
// })

// app.post("/movies", verifyToken, (req, res) => {
//     const movie = {
//         id: randomUUID(),
//         title: req.body.title,
//         director: req.body.director,
//         release_date: req.body.release_date
//     }
//     jwt.verify(req.token, "arjavKey", (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             movies.push(movie)
//             res.json({ msg: "Movie is added to the list", user: movie })
//         }
//     })

//     console.log("MOVIES ", movie)


//     // for (let movie of movies){
//     //     if(movie.id)
//     // }
// })

// app.get("/movies/:id", (req, res) => {
//     const found = movies.some((movie) => movie.id === req.params.id)

//     if (found) {
//         movies.forEach((value) => {
//             if (value.id === req.params.id) {
//                 res.json(value)
//             }
//         })
//     }
// })

// app.delete("/movies/:id", (req, res) => {
//     const found = movies.some((movie) => movie.id === req.params.id)

//     if (found) {
//         movies.forEach((movie) => {
//             if (movie.id !== req.params.id) {
//                 res.json({ msg: "Success Deleted" })
//             }
//         })
//     }
// })