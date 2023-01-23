import express from "express";
import {User} from "../../domain/entity/User";
import * as UserRepository from  "../../domain/repository/User"

const router = express.Router()

router.post('/', async (req, res) => {
    let user = new User(
        req.body.uuid,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.fmc_token,
        true)
    await UserRepository.save(user)

    return res.status(200).json({"user": user})
})

export default router