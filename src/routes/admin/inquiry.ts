import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Inquiry } from "../../infrastructure/db/entity/Inquiry";
import moment, { Moment } from "moment";
import "moment-timezone"
import { getUserNameById } from "../../infrastructure/db/utils";
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    moment.tz.setDefault('Asia/Tokyo');

    const inquiry = await AppDataSource.getRepository(Inquiry)
        .createQueryBuilder('entity')
        .getMany();

    let user_name = []
    for (let i = 0; i < inquiry.length; i++) {
        user_name.push(await getUserNameById(inquiry[i].user_id))
    }

    res.render('pages/admin/inquiry', { inquiry: inquiry, moment: moment, user_name: user_name })
})

export default router
