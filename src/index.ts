import express from "express"
import bodyParser from "body-parser";
import api from "./routes/api/index"
import admin from "./routes/admin/index"
import test from "./routes/test";
import "reflect-metadata"

import { AppDataSource } from "./infrastructure/db/data-source";
import { News } from "./infrastructure/db/entity/News";
import { Inquiry } from "./infrastructure/db/entity/Inquiry";
import { Disaster } from "./infrastructure/db/entity/Disaster";
import { User } from "./infrastructure/db/entity/User";

AppDataSource.initialize()
    .then(async () => {

        const app = express()

        app.set('view engine', 'ejs');

        app.use(bodyParser.json())
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/test', test)
        app.use('/api', api)
        app.use('/admin', admin)

        const port = process.env.PORT || 3000
        app.listen(port)
        console.log("Express WebApi listening on port " + port)

        // TODO: delete this
        // Add fake entry for debugging
        const res = await AppDataSource.getRepository(News)
            .createQueryBuilder('entity')
            .getOne();
        if (res === null) {
            for (let i = 0; i < 30; i++) {
                const news = new News()
                news.author_id = 1
                news.title = "Lorem ipsum"
                news.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci sem, dictum id augue quis, pharetra mollis metus. Morbi rutrum id tellus vitae egestas. Nullam hendrerit, urna a cursus finibus, mi turpis hendrerit est, maximus egestas magna dolor fermentum massa. Duis sagittis bibendum neque, scelerisque ele"
                news.tag = ["test", "test2", "test3"]
                news.datetime = new Date()
                news.isPublished = true

                await AppDataSource.manager.save(news)
            }
        }

        const res2 = await AppDataSource.getRepository(Inquiry)
            .createQueryBuilder('entity')
            .getOne()

        if (res2 === undefined || res2 === null) {
            for (let i = 0; i < 30; i++) {
                const inquiry = new Inquiry()
                inquiry.user_id = 1
                inquiry.title = "Lorem ipsum"
                inquiry.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci sem, dictum id augue quis, pharetra mollis metus. Morbi rutrum id tellus vitae egestas. Nullam hendrerit, urna a cursus finibus, mi turpis hendrerit est, maximus egestas magna dolor fermentum massa. Duis sagittis bibendum neque, scelerisque ele"
                inquiry.datetime = new Date()
                inquiry.isPublished = true

                AppDataSource.manager.save(inquiry)
            }
        }

        const res3 = await AppDataSource.getRepository(Disaster)
            .createQueryBuilder('entity')
            .getOne();

        if (res3 === undefined || res3 === null) {
            for (let i = 0; i < 30; i++) {
                const disaster = new Disaster()
                disaster.author_id = 1
                disaster.title = "Lorem ipsum"
                disaster.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci sem, dictum id augue quis, pharetra mollis metus. Morbi rutrum id tellus vitae egestas. Nullam hendrerit, urna a cursus finibus, mi turpis hendrerit est, maximus egestas magna dolor fermentum massa. Duis sagittis bibendum neque, scelerisque ele"
                disaster.datetime = new Date()
                disaster.tag = ["test"]
                disaster.isPublished = true

                AppDataSource.manager.save(disaster)
            }
        }

        const res4 = await AppDataSource.getRepository(User)
            .createQueryBuilder('entity')
            .getOne();
        if (res3 === undefined || res3 === null) {
            const user = new User();
            user.name = "test user"
            user.password = "lucky"
            AppDataSource.manager.save(user)
        }

        // TODO: delete this ここまで

    })
    .catch((error) => console.log(error))
