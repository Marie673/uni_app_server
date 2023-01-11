import express from "express";
import * as UserRepository from "../../domain/repository/User"
import {User, UserRole} from "../../domain/entity/User";


const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {

    if (await UserRepository.find(req.body.uuid) != null) {
        res.json({ success: false, message: 'Duplicate user_id.' })
    }

    const user: User = {
        user_id: Number(req.body.uuid),
        name: req.body.name,
        password: req.body.password,
        role: UserRole.MEMBER,
        fmc_token: req.body.fmc_token
    }
    await UserRepository.save(user)
    res.json({ success: true, message: "Successful account creation"})
})

export default router