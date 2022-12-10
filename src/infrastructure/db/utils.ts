import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function getUserNameById(user_id: number) {
    const user_name = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.user_id = :user_id", { user_id: user_id })
        .getOne()
    return user_name
}

export { getUserNameById }