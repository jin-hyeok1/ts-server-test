import {Repository} from "typeorm";
import {Schedule} from "./schedule.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {

}