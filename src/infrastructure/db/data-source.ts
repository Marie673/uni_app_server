import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { News } from "./entity/News"
import { Inquiry } from "./entity/Inquiry"
import { Disaster } from "./entity/Disaster"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "user",
    password: "password",
    database: "testdb",
    synchronize: true,
    logging: false,
    entities: [User, News, Inquiry, Disaster],
    subscribers: [],
    migrations: [],
})
