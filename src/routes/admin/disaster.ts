import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Disaster } from "../../infrastructure/db/entity/Disaster";
import moment from "moment";
import { getUserNameById } from "../../infrastructure/db/utils";
import "moment-timezone"
const router = express.Router()

router.get('/details/:id', async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    if (id === null) {

        res.render('pages/admin/error/value_error')
    } else {

        moment.tz.setDefault('Asia/Tokyo');

        const disasterArr = await AppDataSource.getRepository(Disaster)
            .createQueryBuilder('entity')
            .getMany();

        const disaster = disasterArr.find((obj) => {
            return obj.disaster_id === id
        })
        if (disaster === undefined) {
            res.render('pages/admin/error/value_error')
        } else {
            const user_name = await getUserNameById(disaster.disaster_id)
            res.render('pages/admin/disaster/details/id', { disaster: disaster, moment: moment, user_name: user_name })
        }
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    moment.tz.setDefault('Asia/Tokyo');

    const disaster = await AppDataSource.getRepository(Disaster)
        .createQueryBuilder('entity')
        .getMany();

    res.render('pages/admin/disaster', { disaster: disaster, moment: moment })
})

export default router
