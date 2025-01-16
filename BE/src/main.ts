import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NhapMiddleware_1 } from './modules/nhap/middlewares/NhapMiddleware_1.middleware';
import fastifyMultipart from '@fastify/multipart';
import { ConfigService } from '@nestjs/config';
import { App_NhapMiddleware_1 } from './common/middlewares/App_NhapMiddleware_1.middleware';
import { handlebarsConfig } from './config/hbs.config';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  //** Đây là app truyền thống của NestJS */
  // const app = await NestFactory.create(AppModule);

  //** Đây là app sử dụng Express */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  app.useStaticAssets(handlebarsConfig.publicPath);    // Thiết lập file tĩnh (CSS/JS)
  app.setBaseViewsDir(handlebarsConfig.viewsPath);     // Thiết lập Handlebars
  app.setViewEngine('hbs');                            // Set view engine là Handlebars
  hbs.registerPartials(handlebarsConfig.layoutPath);   // Đăng ký layout



  app.use(new App_NhapMiddleware_1().use)              // Áp dụng middleware toàn cục


  const configService = app.get(ConfigService);        // Lấy ConfigService để đọc giá trị từ config
  const port = configService.get<number>('appConfig.APP_PORT') || 8000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
