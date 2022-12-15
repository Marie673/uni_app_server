import {describe, it} from "node:test";
import {TimetableEntity} from "../../infrastructure/db/entity/Timetable";

const expect = require('expect')
const source = require("../../infrastructure/db/data-source")


export interface TimetableValue {
    user_id: number
    name: string
    children?: TimetableValue[]
}
describe('時間割テスト', () => {
    it("should add timetable", async () => {
        const user_id = 2266003
        const data: TimetableValue = {
            user_id: user_id,
            name: "root",
            children: [
                {user_id: user_id, name: "mon", children: [{user_id: user_id, name: "period1: math"}]},
                {user_id: user_id, name: "tue", children: [{user_id: user_id, name: "period2: math"}]}
            ]
        }


        const rep = source.AppDataSource.getRepository(TimetableEntity)

    })
})