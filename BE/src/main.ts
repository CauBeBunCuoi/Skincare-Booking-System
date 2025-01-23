import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { App_Middleware_1 } from './common/middlewares/App_Middleware_1.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(new App_Middleware_1().use)              


  const configService = app.get(ConfigService);        
  const port = configService.get<number>('appConfig.APP_PORT') || 8000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
