import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NhapService } from './Nhap.service';
import { Category, CategoryDocument, CategoryModel } from 'src/database/schemas/category/category.schema';

@Injectable()
export class NhapService_1 {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: CategoryModel,
    @Inject(forwardRef(() => NhapService)) private readonly nhapService: NhapService
  ) { }
  sayHello(): string {
    return 'Hello World! NhapService_1.service.ts';
  }


  async getAllCategories(): Promise<CategoryDocument[]> {
    console.log(this.nhapService.getHelloNhap_1());
    return this.categoryModel.find().exec();   // ** .exec() để chuyển từ Query Object ( categoryModel.find() ) query sang Promise
  }



}


