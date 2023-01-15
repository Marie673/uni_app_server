import {AppDataSource} from "../../infrastructure/db/data-source";
import {News} from "../entity/News";
import news from "../../application/admin/news";


const newsRepository = AppDataSource.getRepository(News)

export async function getNews() {
    return await newsRepository.find()
}