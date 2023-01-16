import express from "express";
import * as NewsRepository from "../../domain/repository/news"
import {News} from "../../domain/entity/News";
import {postNews} from "../../domain/repository/news";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let news = await NewsRepository.getNews()
    console.log()
    if (news == null) {
        return res.status(200).json({message: "no news"})
    }
    return res.status(200).json({news})
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const news: News = {
        author_id: 0,
        content: "test",
        datetime: new Date(Date.now()),
        isPublished: false,
        tag: ['test'],
        title: "test"
    }
    await postNews(news)
    return res.status(200).json({message: "success"})
})
export default router