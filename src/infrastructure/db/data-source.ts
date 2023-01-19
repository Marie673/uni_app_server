import { DataSource } from "typeorm"
import { User } from "../../domain/entity/User"
import { News } from "../../domain/entity/News"
import { Inquiry } from "../../domain/entity/Inquiry"
import { Disaster } from "../../domain/entity/Disaster"
import {Timetable} from "../../domain/entity/Timetable"
const config = require('config')
config.env = process.env.NODE_ENV

export const AppDataSource = new DataSource({
    type: "mysql",
    charset: "utf8mb4",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: false,
    entities: [User, News, Inquiry, Disaster, Timetable],
    subscribers: [],
    migrations: [],
})
