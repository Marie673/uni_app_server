import {User, UserRole} from "../domain/entity/User";
import test, {before, describe, it} from "node:test";
import {insertUser} from "../infrastructure/db/utils";
import {AppDataSource} from "../infrastructure/db/data-source";

test('insert data', async () => {
    AppDataSource.initialize().then(async () => {
        try {
            const new_Data: User = {
                safety_check: false,
                email: "", emailVerifiedAt: false,
                fcm_token: "tseafsefest",
                name: "oka",
                password: "asdlfasdfasdf",
                user_id: 2266003,
                role: UserRole.MEMBER
            }
            console.log("test1")
            await insertUser(new_Data)
        } catch (e) {
            console.log(e)
        }
    })
})