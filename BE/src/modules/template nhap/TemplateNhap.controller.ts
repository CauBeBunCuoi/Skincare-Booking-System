import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, Render, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Nhap2Service } from '../nhap2/Nhap2.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NhapPipe_forString } from './pipes/NhapPipe_forString';
import { NhapPipe_forInteger } from './pipes/NhapPipe_forInteger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NhapGuard_checkHeaderKey } from './guards/NhapGuard_checkHeaderKey.guard';
import { NhapGuard_checkHeaderId } from './guards/NhapGuard_checkHeaderId.guard';
import { NhapInterceptor_3 } from './interceptors/NhapInterceptor_3.interceptor';
import { NhapInterceptor_2 } from './interceptors/NhapInterceptor_2.interceptor';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { AuthGuard_Manual } from './guards/AuthGuard manual/AuthGuard_Manual.guard';
import { RolesGuard } from './guards/AuthGuard manual/RoleGuard.guard';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NhapService } from './services/Nhap.service';
import { NhapService_1 } from './services/NhapService_1.service';
import { NhapService_2 } from './services/NhapService_2.service';
import { Category, CategoryModel } from 'src/database/schemas/category/category.schema';
import { Role, RoleModel } from 'src/database/schemas/role/role.schema';
import { User, UserDocument, UserModel } from 'src/database/schemas/user/user.schema';
import { NhapPipe_1 } from './pipes/NhapPipe_1.pipe';
import { Roles } from 'src/modules/nhap/decorators/role.decorator';
import { CheckMetaData } from './guards/CheckMetaData.guard';
import { join } from 'path';
import { JwtConfig } from 'src/config/jwt.config';
import { JwtOption } from './decorators/jwtOption.decorator';
import { JwtCheckGuard } from './guards/AuthGuard manual/JwtCheckGuard.guard';
import { JwtCheckGuard_With_Option } from './guards/AuthGuard with parameter/JwtCheckGuard_With_Option.guard';



@Controller('templateNhap')
export class TemplateNhapController {


  constructor(
    private readonly appService: AppService,
    private readonly nhapService: NhapService,
    private readonly nhap2Service: Nhap2Service,
    private readonly nhapService_1: NhapService_1,
    private readonly nhapService_2: NhapService_2,
    @InjectModel(Category.name) private categoryModel: CategoryModel,
    @InjectModel(User.name) private userModel: UserModel,
    @InjectModel(Role.name) private roleModel: RoleModel,


  ) { }


  @Get('index_home')
  @Render('home/index')
  index_home(): any {
    console.log("Xử lí trong Controller...");
    return  {username: 'admin'};
  }



}
