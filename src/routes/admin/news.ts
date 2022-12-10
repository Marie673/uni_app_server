import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { News } from "../../infrastructure/db/entity/News";
import moment, { Moment } from "moment";
import "moment-timezone"
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const news = await AppDataSource.getRepository(News)
        .createQueryBuilder('entity')
        .getMany();
    res.render('pages/admin/news', { news: news, moment: moment })
})

export default router
