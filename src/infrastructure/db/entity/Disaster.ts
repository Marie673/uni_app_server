import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Disaster {
    @PrimaryGeneratedColumn()
    readonly disaster_id!: number;

    @Column()
    author_id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    tag!: string[];
}