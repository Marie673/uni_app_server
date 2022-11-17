import express, {Response} from "express";
import jwt from "jsonwebtoken";
import {UserInfo} from "../../domain/user";

const app = express()
// TODO: 鍵をべた書きは良くない
app.set( 'superSecret', 'vxvawwark8vpf4axz17k' )

// 認証パス
// トークン生成
export function generateToken(user_info: UserInfo) {
    return jwt.sign(user_info, app.get('superSecret'),{
        expiresIn: '24h'
    })
}

// jwtの整合性確認
export const authentication = ( req: express.Request, res: Response, next: express.NextFunction) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({success: false, message: 'No token provided.'})
    }
    jwt.verify(token, app.get('superSecret'), function (err: any, decoded: any) {
        if (err) {
            return res.json({success: false, message: 'Invalid token.'})
        }
        return
    })
    next()
}

// jwtからユーザデータ抽出
export function extraction (req: express.Request): UserInfo | unknown {
    let info: UserInfo = {
        'uuid': 0,
        'name': "",
    }
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    jwt.verify(token, app.get('superSecret'), function (err: any, decoded: any) {
        if (err) {
            return err
        }
        info = {
            'uuid': Number(decoded.uuid),
            'name': decoded.name,
        }
    })
    return info
}
