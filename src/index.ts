import express from "express"
import bodyParser from "body-parser";
import api from "./routes/api/index"
import admin from "./routes/admin/index"
import test from "./routes/test";
import "reflect-metadata"

import { AppDataSource } from "./infrastructure/db/data-source";

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

    })
    .catch((error) => console.log(error))
