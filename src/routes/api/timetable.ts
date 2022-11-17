import express from "express";
import {UserInfo, Timetable, implementsUserInfo} from "../../domain/user"
import {extraction} from "../../infrastructure/authentication/authentication";
import {getTimeTable} from "../../infrastructure/mariadb/testdb";

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let user_info: any = extraction(req)
    if ( !implementsUserInfo(user_info) ) {
        return res.status(400).json({message: "invalid token"})
    }
    try {
        let timetable: Timetable | unknown = await getTimeTable(user_info.uuid)
        return res.status(200).json(timetable)
    }
    catch (error: any) {
        return res.status(400).json({message: error.message})
    }
})

// TODO: post実装
router.post('/', async (req: express.Request, res: express.Response) => {
    let user_info: any = extraction(req)
    if ( !implementsUserInfo(user_info)) {
        return res.status(400).json({message: "invalid token"})
    }
    try {
        // TODO: infrastructureに更新する関数を作って呼び出し
        return res.status(200)
    }
    catch (error: any) {
        return res.status(400).json({message: error.message})
    }
})

export default router