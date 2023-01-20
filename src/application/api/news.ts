import express from "express";
import * as NewsRepository from "../../domain/repository/News"
import {News} from "../../domain/entity/News";
import {postNews} from "../../domain/repository/News";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        let news = await NewsRepository.getNews()
        if (news == null) {
            return res.status(200).json({message: "no news"})
        }
        return res.status(200).json({news})
    }
    catch (e) {
        console.log(e)
        return res.json()
    }
})

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
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
    }
    catch (e) {
        console.log(e)
        return res.json()
    }
})
export default router