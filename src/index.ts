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



    })
    .catch((error) => console.log(error))
