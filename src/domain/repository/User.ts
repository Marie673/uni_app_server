import {User} from "../entity/User";
import {AppDataSource} from "../../infrastructure/db/data-source";


const userRepository = AppDataSource.getRepository(User)

export async function save(user: User): Promise<boolean> {
    await userRepository
        .save(user)
    return true
}

export async function find(user_id: number) {
    return await userRepository
        .findOneBy({user_id: user_id})
}

export async function remove(user_id: number): Promise<boolean> {
    const user = await userRepository
        .findOneBy({user_id: user_id})
    if (user !== null) {
        // TODO: Timetableの削除
        await userRepository.remove(user)
        return true
    }

    return false
}
