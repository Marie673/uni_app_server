import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserRole {
    STAFF = "staff",
    MEMBER = "member",
}

@Entity()
export class User {
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
}