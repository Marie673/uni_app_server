import {UserEntity, UserInterface, UserRole} from "../entity/User";


interface UserRepository {
    save(user: UserEntity): boolean

}

