import {User} from "../entity/User";
import {AppDataSource} from "../../infrastructure/db/data-source";


const userRepository = AppDataSource.getRepository(User)

export async function save(user: User): Promise<boolean> {
    await userRepository
        .save(user)
    return true
}

export async function find(user_id: number): Promise<User | null> {
    // console.log(await userRepository.findOneBy({user_id: user_id}))
    return await userRepository.createQueryBuilder()
        .where("user.user_id = :id", {id: user_id})
        .getOne()
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

export async function getFcmToken(user_id: number) {
    const user = await find(user_id)
    if (user != null && 'fcm_token' in user ) {
        return user.fcm_token
    }
    else {
        return null
    }
}

export async function getAllUserFcmTokens() {
    const users = await userRepository.find()
    let fcm_tokens: string[] = []
    for (const user of users){
        fcm_tokens.push(user.fcm_token)
    }
    return fcm_tokens
}