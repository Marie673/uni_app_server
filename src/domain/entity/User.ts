import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from "typeorm"
import {Timetable} from "./Timetable";
import timetable from "../../application/api/timetable";
import {AppDataSource} from "../../infrastructure/db/data-source";


export enum UserRole {
    STAFF = "staff",
    MEMBER = "member",
}

export interface UserInterface {
    user_id: number
    name: string
    password: string
    role: UserRole
    fmc_token: string
    time_table?: Timetable[] | null
}

@Entity()
export class User implements UserInterface{
    @PrimaryColumn()
    readonly user_id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole = UserRole.MEMBER;

    @Column({ type: 'varchar', nullable: true })
    fmc_token: string

    @OneToMany(type => Timetable, (time_table) => time_table.user)
    time_table?: Timetable[]

    constructor(user_id: number, name: string, password: string
                , fmc_token: string) {
        this.user_id = user_id
        this.name = name
        this.password = password
        this.fmc_token = fmc_token
    }

}

export function implementsUser(obj: any): obj is User {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'user_id' in obj &&
        'password' in obj
    )
}
