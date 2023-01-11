import * as typeorm from "typeorm"
import {Column, JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";

export enum DayOfWeek {
    MON = "monday",
    TUE = "tuesday",
    WED = "wednesday",
    THU = "thursday",
    FRI = "friday",
}

export interface TimetableInterface {
    readonly id?: number
    user_id: number
    day_of_week: DayOfWeek
    period1: string | null
    period2: string | null
    period3: string | null
    period4: string | null
    period5: string | null
}

@typeorm.Entity()
export class Timetable implements TimetableInterface{
    @typeorm.PrimaryGeneratedColumn()
    readonly id?: number
    @Column()
    user_id: number
    @Column({
        type: "enum",
        enum: DayOfWeek
    })
    day_of_week: DayOfWeek;
    @Column({ type: 'varchar', nullable: true })
    period1: string | null;
    @Column({ type: 'varchar', nullable: true })
    period2: string | null;
    @Column({ type: 'varchar', nullable: true })
    period3: string | null;
    @Column({ type: 'varchar', nullable: true })
    period4: string | null;
    @Column({ type: 'varchar', nullable: true })
    period5: string | null;
    @ManyToOne(type => User, user => user.time_table,{
        nullable: true
    })
    @JoinColumn({ name: "user_id"})
    user!: User

   constructor(user_id: number, day_of_week: DayOfWeek, period1: string | null, period2: string | null,
               period3: string | null, period4: string | null, period5: string | null) {
       this.user_id = user_id
       this.day_of_week = day_of_week
       this.period1 = period1
       this.period2 = period2
       this.period3 = period3
       this.period4 = period4
       this.period5 = period5
   }
}
