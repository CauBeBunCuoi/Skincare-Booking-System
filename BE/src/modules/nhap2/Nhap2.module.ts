import { Module } from '@nestjs/common';
import { Nhap2Controller } from './Nhap2.controller';
import { AppService } from 'src/app.service';
import { Nhap2Service } from './Nhap2.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/database/schemas/category/category.schema';
import { NhapService } from '../nhap/services/Nhap.service';
import { NhapService_1 } from '../nhap/services/NhapService_1.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]) // [ĐĂNG KÝ] Import Schema vào module
  ], 
  controllers: [Nhap2Controller], // Đăng ký UserController tại đây
  providers: [
    AppService,
    Nhap2Service,
    NhapService,
    NhapService_1,
  ],
})
export class Nhap2Module {}
