import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NhapModule } from './modules/nhap/Nhap.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './database/schemas/product/product.schema';
import { User, UserSchema } from './database/schemas/user/user.schema';
import { Role, RoleSchema } from './database/schemas/role/role.schema';
import { AppMigration } from './app.migration';
import { Nhap2Module } from './modules/nhap2/Nhap2.module';
import { Category, CategorySchema } from './database/schemas/category/category.schema';
import { TemplateNhapController } from './modules/template nhap/TemplateNhap.controller';
import { TemplateNhapModule } from './modules/template nhap/TemplateNhap.module';
import { handlebarsConfig } from './config/hbs.config';

//*** thứ tự thực thi */
//1. Load các module trong imports
//  + ConfigModule chờ generalConfiguration và mongo_databaseConfiguration chạy xong
//  + DatabaseModule chờ ConfigModule chạy xong

//2. Load các controller trong controllers
//3. Load các provider trong providers

@Module({
  imports: [
    TemplateNhapModule, // MVC
    NhapModule,
    Nhap2Module,
    DatabaseModule,


    ConfigModule.forRoot({  // Configure cho ConfigService
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
    }),
    MongooseModule.forFeature([
      //** name ở đây để sử dụng trong @InjectModel inject trong service/controller, @InjectModel(User.name) 
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),


  ],                                    // Import các module khác vào module này
  controllers: [AppController],         // Đăng ký danh sách controller cho module này
  providers: [                          // Đăng ký danh sách provider (service, repository, helper...) để có thể inject vào controller hoặc các service khác
    AppService,
    AppMigration 
  ],
})
export class AppModule { }

