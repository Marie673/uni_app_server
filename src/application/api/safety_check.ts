import express from "express";
import {extraction} from "../../infrastructure/authentication/authentication";
import {implementsMinimumUser, User} from "../../domain/entity/User";
import * as UserRepository from "../../domain/repository/User"
import {messaging} from "firebase-admin";

const router = express.Router()

// 安否確認が必要か否かの確認
router.get('/', async (req: express.Request, res: express.Response) => {
    // TODO: statusの設定
    try {
        let user_info: any = extraction(req)
        if (!implementsMinimumUser(user_info)) {
            return res.json({message: "invalid token"})
        }
        const user_id = user_info.user_id
        if (isNaN(user_id)) {
            return res.json({message: "invalid token"})
        }
        const user: User | null = await UserRepository.find(user_id)
        let status = user?.safety_check

        if (status) {
            return res.json({check: 'True'})
        } else {
            return res.json({check: 'False'})
        }
    }
    catch (e) {
        console.error(e)
        return res.json({message: "invalid"})
    }
})

export default router