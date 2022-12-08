import express from "express"
import bodyParser from "body-parser";
import api from "./routes/api/index"
import admin from "./routes/admin/index"
import test from "./routes/test";
import "reflect-metadata"

import { AppDataSource } from "./infrastructure/db/data-source";
import { News } from "./infrastructure/db/entity/News";

AppDataSource.initialize()
    .then(() => {

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
        const news = new News()
        news.author_id = 0
        news.title = "Lorem ipsum"
        news.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci sem, dictum id augue quis, pharetra mollis metus. Morbi rutrum id tellus vitae egestas. Nullam hendrerit, urna a cursus finibus, mi turpis hendrerit est, maximus egestas magna dolor fermentum massa. Duis sagittis bibendum neque, scelerisque ele"
        news.tag = ["test"]
        news.datetime = new Date()
        news.isPublished = true

        AppDataSource.manager.save(news)
    })
    .catch((error) => console.log(error))
