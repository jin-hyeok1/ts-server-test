import {Controller, Get} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {
  }
  @Get()
  async test(): Promise<any> {
    await this.scheduleService.test()
  }
}
