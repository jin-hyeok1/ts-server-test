import {Injectable} from '@nestjs/common';
import {Scheduler, serviceMap, TimeUnit} from "./schedule.common";
import {BatchService} from "../batch/BatchService";
import {Schedule} from "./schedule.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ScheduleService {
  constructor(@InjectRepository(Schedule) private readonly scheduleRepository: Repository<Schedule>) {
  }

  tasks: Map<string, Scheduler> = new Map();

  async getAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find();
  }

  async test(): Promise<any> {
    const schedule: Schedule = this.scheduleRepository.create({
      delay: 3,
      targetService: BatchService.name,
      interval: 5,
      timeUnit: TimeUnit.SECOND,
      totalCount: 3
    });
    let saved = await this.scheduleRepository.save(schedule);
    this.tasks.set(saved.id, new Scheduler({
      task: new BatchService(),
      delay: 3,
      interval: 5,
      timeUnit: TimeUnit.SECOND,
      totalCount: 3
    }))
  }
}
