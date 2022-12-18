import express, {Response} from "express";
import jwt from "jsonwebtoken";
import {UserEntity} from "../../domain/entity/User";

const app = express()
// TODO: 鍵をべた書きは良くない
app.set('superSecret', 'vxvawwark8vpf4axz17k')
const jwtSecret = 'vxvawwark8vpf4axz17k'
const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '24h',
}

interface jwtInfo {
    user_id: number
    name: string
}
export function implementsJwtInfo(obj: any): obj is jwtInfo {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'user_id' in obj &&
        'name' in obj
    )
}

// 認証パス
// トークン生成
export function generateToken(user: UserEntity) {
    const user_info: jwtInfo = {
        user_id: user.user_id,
        name: user.name
    }
    return jwt.sign(user_info, jwtSecret)
}

// jwtの整合性確認
export const authentication = (req: express.Request, res: Response, next: express.NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({ success: false, message: 'No token provided.' })
    }
    jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
        if (err) {
            return res.json({ success: false, message: 'Invalid token.' })
        }
        return
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
        name: decoded.name
    }
}
