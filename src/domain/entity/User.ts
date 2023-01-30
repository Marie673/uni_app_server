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
    fcm_token: string
    time_table?: Timetable[] | null
}

@Entity()
export class User implements UserInterface{
    @PrimaryColumn()
    readonly user_id: number;

    @Column()
    name: string;
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole = UserRole.MEMBER;

    @Column({ type: 'varchar', nullable: true })
    fcm_token: string
    @Column()
    emailVerifiedAt: boolean
    @Column()
    safety_check: boolean = false

    @OneToMany(type => Timetable, (time_table) => time_table.user)
    time_table?: Timetable[]

    constructor(user_id: number, name: string, mail: string,password: string
                , fmc_token: string, emailVerifiedAt: boolean) {
        this.user_id = user_id
        this.name = name
        this.email = mail
        this.password = password
        this.fcm_token = fmc_token
        this.emailVerifiedAt = emailVerifiedAt
    }

}

export function implementsMinimumUser(obj: any): obj is User {
    return (
        typeof obj === 'object' &&
            obj !== null &&
            'user_id' in obj &&
            'name' in obj &&
            'fcm_token' in obj
    )
}

export function implementsUser(obj: any): obj is User {
    return (
        typeof obj === 'object' &&
            obj !== null &&
            'user_id' in obj &&
            'password' in obj
    )
}
