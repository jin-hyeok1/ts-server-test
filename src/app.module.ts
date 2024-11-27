import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1q2w3e4r',
        database: 'fornest',
        synchronize: true,
        entities: []
      })
  ],
  controllers: [AppController, MemberController],
  providers: [AppService, MemberService],
})
export class AppModule {}
