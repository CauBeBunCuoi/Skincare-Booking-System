import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NhapService_1 } from './NhapService_1.service';
import { Category, CategoryDocument, CategoryModel } from 'src/database/schemas/category/category.schema';

@Injectable()
export class NhapService {
  constructor(
    // ** ĐỂ 1 service có thể inject mongoDB model thì module provider service đó CẦN PHẢI import MongooseModule.forFeature
    @InjectModel(Category.name) private readonly categoryModel: CategoryModel,
    @Inject(forwardRef(() => NhapService_1)) private readonly nhapService_1: NhapService_1,       // ** 2 service (NhapService và NhapService_1) cùng inject nhau thì cần @Inject(forwardRef(() => ServiceName)) để tránh lỗi circular dependency

  ) { }
  getHelloNhap_1(): string {
    return 'Hello World! Nhap.service.ts';
  }

  async getAllCategories(): Promise<CategoryDocument[]> {
    console.log(this.nhapService_1.sayHello());
    return this.categoryModel.find().exec();   // ** .exec() để chuyển từ Query Object ( categoryModel.find() ) query sang Promise
  }

  async createCategory(category: Category): Promise<CategoryDocument> {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  


}


