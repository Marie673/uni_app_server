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

        if ((await rep.count()) === 0) {
            const saveTable = async ({table, parent}: { table: TimetableValue, parent?: TimetableEntity}) => {
                const timetableEntity = new TimetableEntity(table.user_id, table.name, parent)
                await rep.save(table)
                if (table.children)
                    for (const child of table.children) await saveTable({table: child, parent: timetableEntity})
            }
            await saveTable({table: data})
        }
        console.log("データの取得")
        const item1 = await rep.find()
        console.log(JSON.stringify(item1, null, " "))

        console.log("ツリー")
        const item2 = await rep.findTrees()
        console.log(JSON.stringify(item2, null, " "))

    })
})