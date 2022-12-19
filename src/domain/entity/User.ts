import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserRole {
    STAFF = "staff",
    MEMBER = "member",
}

export interface UserInterface {
    user_id: number
    name: string
    password?: string
    role?: UserRole
    fmc_token?: string

    save?(user: UserEntity): boolean
    delete?(user_id: number): boolean
    update?(user: UserEntity): boolean
}

@Entity()
export class UserEntity implements UserInterface{
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role!: UserRole;
    @Column()
    fmc_token!: string
}

export function implementsUser(obj: any): obj is UserEntity {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'uuid' in obj &&
        'name' in obj &&
        'password' in obj
    )
}
