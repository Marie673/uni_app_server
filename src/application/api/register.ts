import express from "express";
import * as UserRepository from "../../domain/repository/User";
import * as crypto from "crypto";


const config = require('config')
config.env = process.env.NODE_ENV

const router = express.Router()

router.get('/:id/:hash', async (req: express.Request, res: express.Response) => {
    const appKey = config.authentication.register
    const user_id = Number(req.params.id)
    const user = await UserRepository.find(user_id)
    if (user == null) {
        return res.status(422).send("このURLは正しくありません。")
    }
    if (user.emailVerifiedAt) {
        return res.status(422).send("すでに登録が完了しています。")
    }

    const now = new Date()
    const hash = crypto.createHash('sha1')
        .update(user.email)
        .digest('hex')
    const isCorrectHash = (hash === req.params.hash)
    const req_expires = Number(req.query.expires)
    const isExpired = (now.getTime() < req_expires)
    const base_url = req.protocol + "://" + req.get('host') + "/api/register"
    const verificationUrl = base_url + req.url.split('&signature=')[0]
    const signature = crypto.createHmac('sha256', appKey)
        .update(verificationUrl)
        .digest('hex')
    const isCorrectSignature = (signature === req.query.signature)

    if (!isCorrectHash || !isCorrectSignature || !isExpired) {
        console.log("status: {isCorrectHash: %O, isCorrectSignature: %O, isExpired: %O}",
            isCorrectHash, isCorrectSignature, isExpired)
        return res.status(422).send('このURLは既に有効期限切れか、正しくありません。')
    }

    user.emailVerifiedAt = true
    await UserRepository.save(user)

    return res.status(200).send("認証に成功しました。")
})

export default router