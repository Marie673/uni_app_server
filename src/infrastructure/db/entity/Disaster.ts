import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Disaster {
    @PrimaryGeneratedColumn()
    readonly disaster_id!: number;

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