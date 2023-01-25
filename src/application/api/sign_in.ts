import express from "express";
import * as UserRepository from "../../domain/repository/User"
import {User, UserRole} from "../../domain/entity/User";
import {sendMail} from "../../infrastructure/authentication/mailer";
import * as crypto from "crypto";

const config = require('config')
config.env = process.env.NODE_ENV

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        if (isNaN(Number(req.body.uuid))) {
            return res.json({message: 'Bad request'})
        }
        let reg_user = await UserRepository.find(req.body.uuid)
        if (reg_user != null && reg_user.emailVerifiedAt) {
            return res.json({succeed: false, message: "登録済みのメールアドレスです。"})
        }

        const email = req.body.email
        let domain = email.split(`@`)[1]
        if (domain != "e.hiroshima-cu.ac.jp") {
            return res.json({succeed: false, message: "大学のメールアドレスを使用してください。"})
        }

        function generateRegisterUrl(user_id: number) {
            const appKey = config.authentication.register
            const base_url = req.protocol + "://" + req.get('host') + "/api/register/"
            let hash = crypto.createHash('sha1')
                .update(email)
                .digest('hex')
            console.log(email, hash)
            const now = new Date();
            const expiration = now.setHours(now.getHours() + 1)
            let url = base_url + user_id + '/' + hash +
                "?expires=" + expiration
            const signature = crypto.createHmac('sha256', appKey)
                .update(url)
                .digest('hex')
            url += '&signature=' + signature

            return url
        }

        const user: User = {
            safety_check: false,
            user_id: Number(req.body.uuid),
            name: req.body.name,
            email: req.body.email,
            password: crypto.createHash('sha256')
                .update(req.body.password)
                .digest('hex'),
            role: UserRole.MEMBER,
            fcm_token: req.body.fcm_token,
            emailVerifiedAt: false
        }
        await UserRepository.save(user)

        const url = generateRegisterUrl(user.user_id)
        const sub = "メールアドレスの認証"
        const text =
            "下記のリンクへアクセスしてメールアドレスを認証してください\n\n"
            + url
        await sendMail(email, sub, text)

        return res.json({succeed: true, message: "メール認証を行ってください"})
    }
    catch (e) {
        console.log(e)
        return res.json()
    }
})

export default router