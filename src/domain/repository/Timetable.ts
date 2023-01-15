import {AppDataSource} from "../../infrastructure/db/data-source";
import {Timetable} from "../entity/Timetable";
import timetable from "../../application/api/timetable";


const timetableRepository = AppDataSource.getRepository(Timetable)

export async function save(new_timetable: Timetable): Promise<boolean> {
    let timetable = await timetableRepository.
        findOneBy( {
            user_id: new_timetable.user_id,
            day_of_week: new_timetable.day_of_week
        })
    if (timetable != null) {
        timetable.period1 = new_timetable.period1
        timetable.period2 = new_timetable.period2
        timetable.period3 = new_timetable.period3
        timetable.period4 = new_timetable.period4
        timetable.period5 = new_timetable.period5

        await timetableRepository.save(timetable)
    }
    else {
        await timetableRepository.save(new_timetable)
    }
    return true
}

export async function find(user_id: number) {
    await timetableRepository
        .findBy({user_id: user_id})
}