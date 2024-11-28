import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MemberController} from './member/member.controller';
import {MemberService} from './member/member.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleController} from "./schedule/schedule.controller";
import {ScheduleService} from "./schedule/schedule.service";
import {ScheduleHolder} from "./schedule/schedule.common";
import {Schedule} from "./schedule/schedule.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.10.76',
      port: 30899,
      username: 'root',
      password: '1q2w3e4r',
      database: 'fornest',
      synchronize: true,
      entities: [Schedule]
    }),
    TypeOrmModule.forFeature([Schedule])
  ],
  controllers: [AppController, MemberController, ScheduleController],
  providers: [AppService, MemberService, ScheduleService, ScheduleHolder],
})
export class AppModule {
}
