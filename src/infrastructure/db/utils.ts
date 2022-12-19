import {AppDataSource} from "./data-source";
import {UserEntity} from "../../domain/entity/User";

async function getUserById(user_id: number) {
    return await AppDataSource.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", {user_id: user_id})
        .getOne()
}

async function insertUser(user: UserEntity) {
    const article = AppDataSource.getRepository(UserEntity)
        .create(user)
    return await AppDataSource.getRepository(UserEntity)
        .save(article)
}

export { getUserById }