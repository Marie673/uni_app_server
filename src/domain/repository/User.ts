import {UserEntity, UserInterface, UserRole} from "../entity/User";
import {TreeRepositoryUtils} from "typeorm";



class UserRepository implements UserInterface {
    name!: string
    user_id!: number
    save(user: UserEntity): boolean {
        return true
    }

    delete(user_id: number): boolean {
        return true
    }

    update(user: UserEntity): boolean {
        return true
    }

}