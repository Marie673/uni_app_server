import express from "express";
import safety_check from "../api/safety_check";


const app = express()
const router = express.Router()

router.post('/', async (req, res) => {
    let user = await
    console.log(safety_check, app.locals.safety_check)
    return res.status(200).json({"safety-check": safety_check})
})

export default router