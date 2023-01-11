import express from "express";
import { User, implementsUser } from "../../domain/entity/User"
import {getUserById} from "../../infrastructure/db/utils";
import { generateToken, extraction } from "../../infrastructure/authentication/authentication"
import * as UserRepository from "../../domain/repository/User";


const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    const user_id = Number(req.body.uuid)
    const user: Promise<User | null> = getUserById(user_id)
    console.log("get login request:"+ user)
    if (!implementsUser(user)) {
        return res.json({ success: false, message: 'Authentication failed.' })
    }

    if (user.user_id == req.body.uuid && user.password == req.body.password) {
        let token = generateToken(user)
        if (user.fmc_token != req.body.fmc_token) {
            user.fmc_token = req.body.fmc_token
            await UserRepository.save(user)
        }
        res.json({ success: true, message: 'Authentication successfully finished.', token: token })
    }
    else {
        res.json({ success: false, message: 'Authentication failed.' })
    }
})

router.post('/update', async (req: express.Request, res: express.Response) => {
    const user_ = extraction(req)
    const user_id = Number(req.body.uuid)
    const user: Promise<User | null> = getUserById(user_id)
    if (!implementsUser(user)) {
        return res.json({ success: false, message: 'Authentication failed.' })
    }

    if (user.password == req.body.old_password) {
        user.password = req.body.old_password
        await UserRepository.save(user)
        return res.status(200).json({ success: true })
    }
    else {
        return res.status(200).json({ success: false })
    }
})

export default router