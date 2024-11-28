import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {rootLogger} from "ts-jest";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
