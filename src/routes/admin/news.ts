import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { News } from "../../infrastructure/db/entity/News";
import moment from "moment";
import "moment-timezone"
import { getUserById } from "../../infrastructure/db/utils";
const router = express.Router()

router.get('/details/:id', async (req: express.Request, res: express.Response) => {
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
            const user = await getUserById(news.author_id)
            res.render('pages/admin/news/details/id', { news: news, moment: moment, user: user })
        }
    }
})
router.get('/page/:page', async (req: express.Request, res: express.Response) => {
    const page: number = +req.params.page;

    if (page === null) {
        res.render('pages/admin/error/value_error')
    } else {
        const [_, count] = await AppDataSource.getRepository(News).findAndCount()
        if (count < page * 10) {
            res.render('pages/admin/error/value_error')
        } else {
            const news = await AppDataSource.getRepository(News)
                .createQueryBuilder("news")
                .orderBy("news.news_id", "DESC")
                .take(10)
                .skip((page - 1) * 10)
                .getMany()
            res.render('pages/admin/news', { news: news, moment: moment, current_page: page, page_count: count / 10 })
        }
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    res.redirect('news/page/1')
})

export default router
