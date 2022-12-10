import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { News } from "../../infrastructure/db/entity/News";
import moment from "moment";
import "moment-timezone"
import { getUserNameById } from "../../infrastructure/db/utils";
const router = express.Router()

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    if (id === null) {

        res.render('pages/admin/error/value_error')
    } else {

        moment.tz.setDefault('Asia/Tokyo');

        const newsArr = await AppDataSource.getRepository(News)
            .createQueryBuilder('entity')
            .getMany();

        const news = newsArr.find((obj) => {
            return obj.news_id === id
        })
        if (news === undefined) {
            res.render('pages/admin/error/value_error')
        } else {
            const user_name = await getUserNameById(news.author_id)
            res.render('pages/admin/news/id', { news: news, moment: moment, user_name: user_name })
        }
    }
})
router.get('/', async (req: express.Request, res: express.Response) => {
    const news = await AppDataSource.getRepository(News)
        .createQueryBuilder('entity')
        .getMany();
    res.render('pages/admin/news', { news: news, moment: moment })
})

export default router
