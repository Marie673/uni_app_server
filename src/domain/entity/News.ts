import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    readonly news_id?: number;

    @Column()
    author_id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @Column({ type: 'simple-array' })
    tag: string[];

    @Column()
    datetime: Date;

    @Column()
    isPublished: boolean;

    constructor(author_id: number, title: string, content: string, tag: string[],
                datetime: Date, isPublished: boolean) {
        this.author_id = author_id
        this.title = title
        this.content = content
        this.tag = tag
        this.datetime = datetime
        this.isPublished = isPublished

    }
}