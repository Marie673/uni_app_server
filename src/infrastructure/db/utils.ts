import {AppDataSource} from "./data-source";
import {UserEntity} from "../../domain/entity/User";

async function getUserById(user_id: number) {
    return await AppDataSource.getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", {user_id: user_id})
        .getOne()
}

export { getUserById }