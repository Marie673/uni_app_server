import express from "express";
import {User, implementsUser,UserInfo, implementsUserInfo} from "../../domain/user"
import * as mariadb from "../../infrastructure/mariadb/testdb"
import {generateToken, extraction} from "../../infrastructure/authentication/authentication"


const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    const user: User | unknown = await mariadb.getUser(Number(req.body.uuid))
    console.log(user)
    if (!implementsUser(user)) {
        return res.json({success: false,  message: 'Authentication failed.'})
    }
    const user_info: UserInfo = {
        uuid: user.uuid,
        name: user.name,
    }

    if (user.uuid == req.body.uuid && user.password == req.body.password) {
        let token = generateToken(user_info)
        await mariadb.updateFcmToken(user.uuid, req.body.fcmtoken)
        res.json( { success: true, message: 'Authentication successfully finished.', token: token } )
    }
    else {
        res.json({success: false,  message: 'Authentication failed.'})
    }
})

router.post('/update', async (req: express.Request, res: express.Response) => {
    let user_info: any = extraction(req)
    if ( !implementsUserInfo(user_info) ) {
        return res.status(400).json({message: "invalid token"})
    }

    const user: User | unknown = await mariadb.getUser(user_info.uuid)
    if (!implementsUser(user)) {
        return res.json({success: false,  message: 'Authentication failed.'})
    }
    if (user.password == req.body.old_password) {
        await mariadb.updatePassword(user_info.uuid, req.body.new_password)
        return res.status(200).json({success: true})
    }
    else {
        return res.status(200).json({success: false})
    }
})

export default router