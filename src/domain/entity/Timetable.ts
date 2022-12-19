import * as typeorm from "typeorm"


@typeorm.Entity()
export class Timetable {

    @typeorm.PrimaryGeneratedColumn()
    id!: number

    @typeorm.Column()
    user_id!: number
    // mon
    @typeorm.Column()
    mon_period1?: string
    @typeorm.Column()
    mon_period2?: string
    @typeorm.Column()
    mon_period3?: string
    @typeorm.Column()
    mon_period4?: string
    @typeorm.Column()
    mon_period5?: string

    // tue
    @typeorm.Column()
    tue_period1?: string
    @typeorm.Column()
    tue_period2?: string
    @typeorm.Column()
    tue_period3?: string
    @typeorm.Column()
    tue_period4?: string
    @typeorm.Column()
    tue_period5?: string

    // wed
    @typeorm.Column()
    wed_period1?: string
    @typeorm.Column()
    wed_period2?: string
    @typeorm.Column()
    wed_period3?: string
    @typeorm.Column()
    wed_period4?: string
    @typeorm.Column()
    wed_period5?: string

    // thu
    @typeorm.Column()
    thu_period1?: string
    @typeorm.Column()
    thu_period2?: string
    @typeorm.Column()
    thu_period3?: string
    @typeorm.Column()
    thu_period4?: string
    @typeorm.Column()
    thu_period5?: string

    // fri
    @typeorm.Column()
    fri_period1?: string
    @typeorm.Column()
    fri_period2?: string
    @typeorm.Column()
    fri_period3?: string
    @typeorm.Column()
    fri_period4?: string
    @typeorm.Column()
    fri_period5?: string
}
