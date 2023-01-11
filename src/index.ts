import * as https from "https";
import express from "express"
import bodyParser from "body-parser";
import api from "./application/api/index"
import admin from "./application/admin/index"
import "reflect-metadata"

import {AppDataSource} from "./infrastructure/db/data-source";
import * as http from "http";
import * as fs from "fs";


const config = require('config')
config.env = process.env.NODE_ENV


AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const server = https.createServer({
            key: fs.readFileSync('./auth/server_key.pem'),
            cert: fs.readFileSync('./auth/cert.pem')
        }, app)

        app.set('view engine', 'ejs');

        app.use(bodyParser.json())
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/api', api)
        app.use('/admin', admin)

        const port = process.env.PORT || 3000
        server.listen(port, () =>
            console.log("Express WebApi listening on port " + port))


        /*
        const new_Data: User = {
            fmc_token: "tseafsefest",
            name: "oka",
            password: "asdlfasdfasdf",
            user_id: 2266003,
            role: UserRole.MEMBER
        }

        const time_table: Timetable = {
            user_id: 2266003,
            day_of_week: DayOfWeek.MON,
            period1: "test_a",
            period2: "test_b",
            period3: "test_c",
            period4: "test_d",
            period5: "test_e",
            user: new_Data
        }
        const userRepo = new UserRepository()
        await userRepo.save(new_Data)
        //await insertTimetable(time_table)

        let result = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_id=2266003")
            .getOne()
        // @ts-ignore
        console.log(result)

        const next_Data: User = {
            fmc_token: "tseafsefest",
            name: "oka",
            password: "test",
            user_id: 2266003,
            role: UserRole.MEMBER
        }
        await insertUser(next_Data)
        result = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_id=2266003")
            .getOne()
        console.log(result)

        await userRepo.delete(2266003)
        */

    })
