import express from "express";
import * as NewsRepository from "../../domain/repository/news"


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    let news = await NewsRepository.getNews()
    if ()
    return res.json(news)
})