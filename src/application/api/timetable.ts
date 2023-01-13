import express from "express";
import { User, implementsUser } from "../../domain/entity/User"
import { extraction } from "../../infrastructure/authentication/authentication";
import * as UserRepository from "../../domain/repository/User"
import * as TimetableRepository from "../../domain/repository/Timetable";
import {Timetable} from "../../domain/entity/Timetable";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let user: any = extraction(req)
    if (!implementsUser(user)) {
        return res.status(400).json({ message: "invalid token" })
    }
    try {
        let timetables = await TimetableRepository.find(user.user_id)
        return res.status(200).json(timetables)
    }
    catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
})

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        let user_info: any = extraction(req)
        console.log(user_info)
        if (!implementsUser(user_info)) {
            return res.status(400).json({message: "invalid token"})
        }
        const user_id = user_info.user_id
        if (isNaN(user_id)) {
            return res.status(400).json({message: "invalid"})
        }
        const user: User | null = await UserRepository.find(user_id)
        if (!implementsUser(user)) {
            return res.status(400).json({message: "invalid"})
        }
        // TODO: infrastructureに更新する関数を作って呼び出し
        const timetable: Timetable = {
            user_id: Number(req.body.uuid),
            day_of_week: req.body.day_of_week,
            period1: req.body.period1,
            period2: req.body.period2,
            period3: req.body.period3,
            period4: req.body.period4,
            period5: req.body.period5,
            user: user,

        }
        await TimetableRepository.save(timetable)
        return res.status(200)
    } catch (err) {
        console.log(err)
        return res.status(400).json({message: err})
    }
})

export default router