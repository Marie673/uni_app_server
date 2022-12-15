import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Inquiry {
    @PrimaryGeneratedColumn()
    readonly inquiry_id!: number;

    @Column()
    user_id!: number;

    @Column("text")
    title!: string;

    @Column("text")
    content!: string;

    @Column()
    datetime!: Date;

    @Column()
    isPublished!: boolean;
}