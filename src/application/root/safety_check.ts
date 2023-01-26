import express from "express";
import safety_check from "../api/safety_check";
import * as UserRepository from "../../domain/repository/User"


const app = express()
const router = express.Router()

router.post('/', async (req, res) => {
    // let user = await UserRepository.
    console.log(safety_check, app.locals.safety_check)
    return res.json({"safety-check": safety_check})
})

export default router