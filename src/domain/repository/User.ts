import {UserEntity, UserInterface, UserRole} from "../entity/User";



class UserRepository{
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
