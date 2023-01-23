import express from "express";
import { User, implementsUser } from "../../domain/entity/User"
import {getUserById} from "../../infrastructure/db/utils";
import { generateToken, extraction } from "../../infrastructure/authentication/authentication"
import * as UserRepository from "../../domain/repository/User";
import crypto from "crypto";


const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        if (isNaN(Number(req.body.uuid))) {
            return res.json({succeed: false, message: "user_idは数字です。"})
        }
        const user_id = Number(req.body.uuid)
        const user: User | null = await UserRepository.find(user_id)
        if (!implementsUser(user)) {
            return res.json({succeed: false, message: 'ユーザーID・パスワードが違います。'})
        }

        if (!user.emailVerifiedAt) {
            return res.json({succeed: false, message: "メールアドレスの認証をしてください。"})
        }

        let password = crypto.createHash('sha256')
            .update(req.body.password)
            .digest('hex')
        if (user.user_id == req.body.uuid && user.password == password) {
            let token = generateToken(user)
            if (user.fcm_token != req.body.fcm_token) {
                user.fcm_token = req.body.fcm_token
                await UserRepository.save(user)
            }
            res.json({succeed: true, message: 'ログインに成功しました。', token: token})
        } else {
            res.json({succeed: false, message: 'ユーザーID・パスワードが違います。'})
        }
    }
    catch (e) {
        console.log(e)
        return res.json()
    }
})

router.post('/update', async (req: express.Request, res: express.Response) => {
    try {
        // const user_ = extraction(req) // jwtからのユーザー認証の可能性 現時点では使用しない
        const user_id = Number(req.body.uuid)

        const user = await UserRepository.find(user_id)
        if (!implementsUser(user)) {
            return res.json({succeed: false, message: 'Authentication failed.'})
        }

        if (user.password == req.body.old_password) {
            user.password = req.body.new_password
            await UserRepository.save(user)
            return res.status(200).json({succeed: true})
        } else {
            return res.status(200).json({succeed: false})
        }
    }
    catch (e) {
        console.error(e)
        return res.status(400).json({succeed: false, message: "認証に失敗しました。"})
    }
})

export default router