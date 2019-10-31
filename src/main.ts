import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';

const app_port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app_port);
  Logger.log(`Server running on http://localhost:${app_port}`, 'Bootstrap');
}
bootstrap();
