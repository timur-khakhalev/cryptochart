import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs'

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./ssl/private.key'),
  //   cert: fs.readFileSync('./ssl/certificate.crt')
  // }
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
