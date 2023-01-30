import express from "express";
const passport = require("passport")
const session = require("express-session")
import {AppDataSource} from "../../infrastructure/db/data-source";
import {User} from "../../domain/entity/User";

const router = express.Router()
const app = express()

app.use(session({
    secret: "0.75feet pumpkin castle"
}))
app.use(passport.initialize())
app.use(passport.session())
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
    session: false,
}, function (req: express.Request, username: string, password: string, done: any) {
    process.nextTick(function (){
        if (username === "test" && password === "test") {
            return done(null, username)
        } else {
            console.log("login error")
            return done(null, false)
        }
    })
}))
/*
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

app.use("/main", require("./routes/main"))
app.use("/login", require("./routes/login"))
*/
export default router