import express from "express";
import { User, implementsUser } from "../../domain/entity/User"
import {getUserById} from "../../infrastructure/db/utils";
import { generateToken, extraction } from "../../infrastructure/authentication/authentication"


const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    const uuid = Number(req.body.uuid)
    const user: Promise<User | null> = getUserById(uuid)
    console.log("get login request:"+ user)
    if (!implementsUser(user)) {
        return res.json({ success: false, message: 'Authentication failed.' })
    }

    if (user.user_id == req.body.uuid && user.password == req.body.password) {
        let token = generateToken(user)
        // TODO: updateFmcToken
        res.json({ success: true, message: 'Authentication successfully finished.', token: token })
    }
    else {
        res.json({ success: false, message: 'Authentication failed.' })
    }
})

router.post('/update', async (req: express.Request, res: express.Response) => {
    const user_ = extraction(req)
    const uuid = Number(req.body.uuid)
    const user: Promise<User | null> = getUserById(uuid)
    if (!implementsUser(user)) {
        return res.json({ success: false, message: 'Authentication failed.' })
    }

    if (user.password == req.body.old_password) {
        // TODO: updatePassword
        return res.status(200).json({ success: true })
    }
    else {
        return res.status(200).json({ success: false })
    }
})

export default router