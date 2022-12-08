import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "user",
    password: "password",
    database: "testdb",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})
