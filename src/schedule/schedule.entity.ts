import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    targetService: string;
    @Column()
    delay: number;
    @Column()
    interval: number;
    @Column()
    timeUnit: string
    @Column()
    totalCount: number
}