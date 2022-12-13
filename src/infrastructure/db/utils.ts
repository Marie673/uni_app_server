import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function getUserById(user_id: number) {
    const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", { user_id: user_id })
        .getOne()
    return user
}

export { getUserById }