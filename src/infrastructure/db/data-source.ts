import { DataSource } from "typeorm"
import { UserEntity } from "../../domain/entity/User"
import { News } from "../../domain/entity/News"
import { Inquiry } from "../../domain/entity/Inquiry"
import { Disaster } from "../../domain/entity/Disaster"
import { Timetable } from "../../domain/entity/Timetable"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "password",
    database: "testdb",
    synchronize: true,
    logging: false,
    entities: [UserEntity, News, Inquiry, Disaster, Timetable],
    subscribers: [],
    migrations: [],
})
