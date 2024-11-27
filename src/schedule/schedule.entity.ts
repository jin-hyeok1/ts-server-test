import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Schedules {
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
}