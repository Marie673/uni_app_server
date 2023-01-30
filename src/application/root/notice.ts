import express from "express";
import {getFcmToken} from "../../domain/repository/User";
import {pushNotification} from "../../infrastructure/filebase/firebase";

const router = express.Router()

router.get('/test', async (req, res) => {
    const fcm_token = await getFcmToken(2266003)
    if (typeof fcm_token == 'string') {
        console.log("test")
        await pushNotification({body: "test", title: "test"}, {Nick: "test", Room: "test"}, [fcm_token])
    }
    return res.json()
})

export default router