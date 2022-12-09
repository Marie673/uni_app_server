import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Disaster } from "../../infrastructure/db/entity/Disaster";
import moment, { Moment } from "moment";
import "moment-timezone"
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    moment.tz.setDefault('Asia/Tokyo');

    const disaster = await AppDataSource.getRepository(Disaster)
        .createQueryBuilder('entity')
        .getMany();

    res.render('pages/admin/disaster', { disaster: disaster, moment: moment })
})

export default router
