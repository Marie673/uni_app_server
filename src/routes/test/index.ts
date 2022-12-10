import express from "express";
import * as testdb from "../../infrastructure/db/testdb"
// import {testPushNotification1} from "../../infrastructure/filebase/firebase";
import { updateTimeTable } from "../../infrastructure/db/testdb";
import { Timetable } from "../../domain/user";

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let user = await testdb.getUser(2266003)
    res.status(200).json(user)
})

// router.get('/notification', async (req: express.Request, res: express.Response) => {
//     await testPushNotification1(2266016)
//     res.status(200).json({status: 'complete'})
// })

router.post('/auth', async (req: express.Request, res: express.Response) => {
    // console.log(req)
    let user = await testdb.getUser(2266003)
    res.status(200).json(user)
})
/*
router.post('/timetable', async (req: express.Request, res: express.Response) => {
    const timetable: Timetable = jsonToTimetable(req.body)

    await updateTimeTable(2266003, timetable)
    res.status(200).json({status: 'complete'})
})
*/

export default router