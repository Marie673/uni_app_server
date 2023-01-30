import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Inquiry } from "../../domain/entity/Inquiry";
import * as UserRepository from "../../domain/repository/User"
import moment from "moment";
import "moment-timezone"
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
            const user = await UserRepository.find(inquiry.user_id)
            res.render('pages/admin/inquiry/details/id', { inquiry: inquiry, moment: moment, user: user })
        }
    }
})

router.get('/page/:page', async (req: express.Request, res: express.Response) => {
    moment.tz.setDefault('Asia/Tokyo');
    const page: number = +req.params.page;

    if (isNaN(page)) {
        res.render('pages/admin/error/value_error')
    } else {
        const [_, count] = await AppDataSource.getRepository(Inquiry).findAndCount()
        if (count == 0) {
            res.render('pages/admin/error/value_error')
        } else {
            const inquiry = await AppDataSource.getRepository(Inquiry)
                .createQueryBuilder("inquiry")
                .orderBy("inquiry.inquiry_id", "DESC")
                .take(10)
                .skip((page - 1) * 10)
                .getMany()
            console.log("-----------------------------")
            console.log(inquiry)
            let user_name = []
            for (let i = 0; i < inquiry.length; i++) {
                user_name.push(await UserRepository.find(inquiry[i].user_id))
            }

            res.render('pages/admin/inquiry', { inquiry: inquiry, moment: moment, user_name: user_name, current_page: page, page_count: count / 10 })
        }
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    res.redirect('inquiry/page/1')
})

export default router
