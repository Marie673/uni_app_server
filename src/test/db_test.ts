import {UserEntity, UserRole} from "../domain/entity/User";
import test from "node:test";
import {insertUser} from "../infrastructure/db/utils";
import {AppDataSource} from "../infrastructure/db/data-source";

test('insert data', async () => {
    AppDataSource.initialize().then(async () => {
        try {
            const new_Data: UserEntity = {
                fmc_token: "test",
                name: "oka",
                password: "testtest",
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