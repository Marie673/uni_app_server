import {AppDataSource} from "./data-source";
import {UserEntity} from "../../domain/entity/User";
import {News} from "../../domain/entity/News";


async function getUserById(user_id: number) {
    return await AppDataSource.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", {user_id: user_id})
        .getOne()
}

async function insertUser(user: UserEntity) {
    return await AppDataSource.getRepository(UserEntity)
        .save(user)
}

async function updateUser(user: UserEntity) {
    const user_data = await AppDataSource.getRepository(UserEntity)
        .findOneBy({user_id: user.user_id})
    return await AppDataSource.getRepository(UserEntity)
        .save(user)
}

export { getUserById, insertUser }