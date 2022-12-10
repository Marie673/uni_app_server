import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Inquiry } from "../../infrastructure/db/entity/Inquiry";
import moment from "moment";
import "moment-timezone"
import { getUserNameById } from "../../infrastructure/db/utils";
const router = express.Router()

router.get('/details/:id', async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    if (id === null) {

        res.render('pages/admin/error/value_error')
    } else {

        moment.tz.setDefault('Asia/Tokyo');

        const inquiryArr = await AppDataSource.getRepository(Inquiry)
            .createQueryBuilder('entity')
            .getMany();

        const inquiry = inquiryArr.find((obj) => {
            return obj.inquiry_id === id
        })
        if (inquiry === undefined) {
            res.render('pages/admin/error/value_error')
        } else {
            const user_name = await getUserNameById(inquiry.user_id)
            res.render('pages/admin/inquiry/details/id', { inquiry: inquiry, moment: moment, user_name: user_name })
        }
    }
})

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
