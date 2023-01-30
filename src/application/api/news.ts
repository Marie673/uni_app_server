import express from "express";
import * as NewsRepository from "../../domain/repository/News"
import {News} from "../../domain/entity/News";
import {postNews} from "../../domain/repository/News";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        let news = await NewsRepository.getNews()
        if (news == null) {
            return res.json({message: "no news"})
        }
        return res.json({news})
    }
    catch (e) {
        console.log(e)
        return res.json({})
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
        return res.json({succeed: true, message: "投稿が完了しました。"})
    }
    catch (e) {
        console.log(e)
        return res.json({succeed: false, message: "投稿に失敗しました。"})
    }
})
export default router