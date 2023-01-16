import express, {Response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../../domain/entity/User";
const config = require('config')
config.env = process.env.NODE_ENV

const app = express()
// TODO: 鍵をべた書きは良くない
app.set('superSecret', config.authentication.jwtSecret)
const jwtSecret = config.authentication.jwtSecret
const jwtOptions = {
    expiresIn: '24h',
}

interface jwtInfo {
    user_id: number
    name: string
    fmc_token: string
}
export function implementsJwtInfo(obj: any): obj is jwtInfo {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'user_id' in obj &&
        'name' in obj &&
        'fmc_token' in obj
    )
}

// 認証パス
// トークン生成
export function generateToken(user: User) {
    const user_info: jwtInfo = {
        user_id: user.user_id,
        name: user.name,
        fmc_token: user.fmc_token
    }
    return jwt.sign(user_info, jwtSecret, jwtOptions)
}

// jwtの整合性確認
export const authentication = (req: express.Request, res: Response, next: express.NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    console.log("token: %O", token)
    if (!token) {
        return res.status(403).send({ success: false, message: 'No token provided.' })
    }
    jwt.verify(token, jwtSecret, { algorithms: ['HS256']}, function (err: any, decoded: any) {
        if (err) {
            console.log(err)
            return res.json({ success: false, message: 'Invalid token.' })
        }
        console.log("jwt_decoded: %O",decoded)
    })
    next()
}

// jwtからユーザデータ抽出
export function extraction(req: express.Request): jwtInfo{
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    let decoded
    try {
        decoded = jwt.verify(token, jwtSecret);
    }
    catch (err) {
        throw err
    }
    if (!implementsJwtInfo(decoded)) {
        throw DOMException
    }

    return {
        user_id: decoded.user_id,
        name: decoded.name,
        fmc_token: decoded.fmc_token
    }
}
