import {AppDataSource} from "../../infrastructure/db/data-source";
import {News} from "../entity/News";


const newsRepository = AppDataSource.getRepository(News)

export async function getNews() {
    return newsRepository.createQueryBuilder()
        .orderBy('news_id', "DESC")
        .limit(10).getMany();
}

export async function postNews(news: News) {
    await newsRepository.save(news)
}