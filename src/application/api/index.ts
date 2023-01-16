import express from "express";
import bodyParser from "body-parser";
import {authentication} from "../../infrastructure/authentication/authentication"
import timetable from "./timetable";
import disaster from "./disaster";
import safety_check from "./safety_check"
import login from "./login"
import sign_in from "./sign_in"
import news from "./news"

const app = express()
const router = express.Router()

app.use( bodyParser.json() )

router.use('/sign-in', sign_in)
router.use('/login', login)

router.use('/safety-check', safety_check)

router.use('/timetable', authentication, timetable)
router.use('/disaster', authentication, disaster)
router.use('/news', authentication, news)


export default router