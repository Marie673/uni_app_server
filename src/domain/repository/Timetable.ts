import {AppDataSource} from "../../infrastructure/db/data-source";
import {Timetable} from "../entity/Timetable";

export class TimetableRepository{
    timetableRepository = AppDataSource.getRepository(Timetable)

    async save(timetable: Timetable): Promise<boolean> {
        await this.timetableRepository.save(timetable)
        return true
    }

    async  find(user_id: number) {

    }
}