import express from "express"
import bodyParser from "body-parser";
import api from "./application/api/index"
import admin from "./application/admin/index"
import "reflect-metadata"

import {AppDataSource} from "./infrastructure/db/data-source";
import {User, UserRole} from "./domain/entity/User";
import {insertTimetable, insertUser} from "./infrastructure/db/utils";
import {DayOfWeek, Timetable} from "./domain/entity/Timetable";

AppDataSource.initialize()
    .then(async () => {
        const app = express()

        app.set('view engine', 'ejs');

        app.use(bodyParser.json())
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/api', api)
        app.use('/admin', admin)

        const port = process.env.PORT || 3000
        app.listen(port)
        console.log("Express WebApi listening on port " + port)

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
        //await insertUser(new_Data)
        //await insertTimetable(time_table)

        const result = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_id=2266003")
            .getOne()
        // @ts-ignore
        console.log(result)

    })
    .catch((error) => console.log(error))
