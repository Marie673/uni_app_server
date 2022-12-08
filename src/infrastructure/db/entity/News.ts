import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    readonly news_id!: number;

    @Column()
    author_id!: number;

    @Column("text")
    title!: string;

    @Column("text")
    content!: string;

    @Column({ type: 'simple-array' })
    tag!: string[];

    @Column()
    datetime!: Date;

    @Column()
    isPublished!: boolean;
}