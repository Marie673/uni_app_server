import {AppDataSource} from "./data-source";
import {User} from "../../domain/entity/User";
import {News} from "../../domain/entity/News";
import {Timetable} from "../../domain/entity/Timetable";


async function getUserById(user_id: number) {
    return await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", {user_id: user_id})
        .getOne()
}

async function insertUser(user: User) {
    return await AppDataSource.getRepository(User)
        .save(user)
}

async function insertTimetable(time_table: Timetable) {
    return await AppDataSource.getRepository(Timetable)
        .save(time_table)
}

async function updateUser(user: User) {
    const user_data = await AppDataSource.getRepository(User)
        .findOneBy({user_id: user.user_id})
    return await AppDataSource.getRepository(User)
        .save(user)
}

export { getUserById, insertUser, insertTimetable }