import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Disaster } from "../../domain/entity/Disaster";
import moment from "moment";
import { getUserById } from "../../infrastructure/db/utils";
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
            const user = await getUserById(disaster.author_id)
            res.render('pages/admin/disaster/details/id', { disaster: disaster, moment: moment, user: user })
        }
    }
})

router.get('/page/:page', async (req: express.Request, res: express.Response) => {
    moment.tz.setDefault('Asia/Tokyo');
    const page: number = +req.params.page;

    if (page === null) {
        res.render('pages/admin/error/value_error')
    } else {
        const [_, count] = await AppDataSource.getRepository(Disaster).findAndCount()
        if (count < page * 10) {
            res.render('pages/admin/error/value_error')
        } else {
            const disaster = await AppDataSource.getRepository(Disaster)
                .createQueryBuilder("disaster")
                .orderBy("disaster.disaster_id", "DESC")
                .take(10)
                .skip((page - 1) * 10)
                .getMany()

            res.render('pages/admin/disaster', { disaster: disaster, moment: moment, current_page: page, page_count: count / 10 })
        }
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    res.redirect('disaster/page/1')
})

export default router
