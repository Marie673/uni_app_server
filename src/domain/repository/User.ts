import {User, UserInterface, UserRole} from "../entity/User";
import {getUserById} from "../../infrastructure/db/utils";


class UserRepository{
    save(user: User): boolean {
        return true
    }

    delete(user_id: number): boolean {
        return true
    }

    update(user: User): boolean {
        return true
    }

}
