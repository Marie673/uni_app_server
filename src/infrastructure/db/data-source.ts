import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { News } from "./entity/News"
import { Inquiry } from "./entity/Inquiry"
import { Disaster } from "./entity/Disaster"
import Timetable from "../../routes/api/timetable";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "password",
    database: "testdb",
    synchronize: true,
    logging: false,
    entities: [User, News, Inquiry, Disaster],
    subscribers: [],
    migrations: [],
})
