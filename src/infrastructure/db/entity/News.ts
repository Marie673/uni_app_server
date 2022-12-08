import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    readonly news_id!: number;

    @Column()
    author_id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    tag!: string[];
}