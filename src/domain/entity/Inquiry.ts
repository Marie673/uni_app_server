import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Inquiry {
    @PrimaryGeneratedColumn()
    readonly inquiry_id?: number;

    @Column()
    user_id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @Column()
    datetime: Date;

    @Column()
    isPublished: boolean;

    constructor(user_id: number, title: string, content: string,
                datetime: Date, isPublished: boolean) {
        this.user_id = user_id
        this.title = title
        this.content = content
        this.datetime = datetime
        this.isPublished = isPublished
    }
}