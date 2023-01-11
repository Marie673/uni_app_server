import { DataSource } from "typeorm"
import { User } from "../../domain/entity/User"
import { News } from "../../domain/entity/News"
import { Inquiry } from "../../domain/entity/Inquiry"
import { Disaster } from "../../domain/entity/Disaster"
import {Timetable} from "../../domain/entity/Timetable";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "uni-app-database.cknwwzyfwuur.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "qRIl24zoLx2e00Qp6Lsf",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, News, Inquiry, Disaster, Timetable],
    subscribers: [],
    migrations: [],
})
