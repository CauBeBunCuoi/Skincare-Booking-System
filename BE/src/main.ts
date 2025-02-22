import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { App_Middleware_1 } from './common/middlewares/App_Middleware_1.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/HttpException.filter';
import * as moment from 'moment-timezone';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  moment.tz.setDefault('Asia/Ho_Chi_Minh');

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(new App_Middleware_1().use)              


  const configService = app.get(ConfigService);        
  const port = configService.get<number>('appConfig.APP_PORT') || 8000;
  const baseUrl = configService.get<string>('appConfig.BASE_URL') || 'http://localhost:8000';

  app.enableCors({ origin: '*' });

  app.useStaticAssets(join(__dirname, '..'));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(port);
  console.log(`Application is running on: ${baseUrl}`);

}
bootstrap();
