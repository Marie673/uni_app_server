import express from "express";
import { User, implementsUser } from "../../domain/entity/User"
import { extraction } from "../../infrastructure/authentication/authentication";
import * as TimetableRepository from "../../domain/repository/Timetable";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let user: any = extraction(req)
    if (!implementsUser(user)) {
        return res.status(400).json({ message: "invalid token" })
    }
    try {
        // TODO: getTimetable
        let timetables = await TimetableRepository.find(user.user_id)
        return res.status(200).json(timetables)
    }
    catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
})

// TODO: post実装
router.post('/', async (req: express.Request, res: express.Response) => {
    let user: any = extraction(req)
    if (!implementsUser(user)) {
        return res.status(400).json({ message: "invalid token" })
    }
    try {
        // TODO: infrastructureに更新する関数を作って呼び出し
        return res.status(200)
    }
    catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
})

export default router