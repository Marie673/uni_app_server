import express, {Response} from "express";
import safety_check from "./safety_check";
import addUser from "./addUser"
import notice from "./notice";
const config = require('config')
config.env = process.env.NODE_ENV


const router = express.Router()

const auth = (req: express.Request, res: Response, next: express.NextFunction) => {
    try {
        const token = req.body.token
        if (token !== config.root.token) {
            console.log("error")
            return res.status(400).json()
        }
        next()
    }
    catch (e) {
        console.log(e)
        return res.status(400).json()
    }
}

router.use('/safety-check', auth, safety_check)
router.use('/addUser', auth, addUser)
router.use('/notice', auth, notice)

export default router