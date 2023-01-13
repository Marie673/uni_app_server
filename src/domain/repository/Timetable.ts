import {AppDataSource} from "../../infrastructure/db/data-source";
import {Timetable} from "../entity/Timetable";


const timetableRepository = AppDataSource.getRepository(Timetable)

export async function save(timetable: Timetable): Promise<boolean> {
    await timetableRepository.save(timetable)
    return true
}

export async function find(user_id: number) {
    await timetableRepository
        .findBy({user_id: user_id})
}