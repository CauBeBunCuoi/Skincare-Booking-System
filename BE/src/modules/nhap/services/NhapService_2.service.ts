import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from 'src/database/schemas/product/product.schema';
import { User, UserDocument, UserModel } from 'src/database/schemas/user/user.schema';

@Injectable()
export class NhapService_2 {
  constructor(
    @InjectModel(Product.name) private readonly productModel: ProductModel,
    @InjectModel(User.name) private readonly userModel: UserModel,
    

  ) { }


  async addRandomProduct(): Promise<Boolean> {
    try {
      // Xóa dữ liệu cũ trong collection
      await this.productModel.deleteMany({});
      console.log('Cleared existing data');

      // Tạo dữ liệu mẫu
      const seedData = [
        { name: 'Product 1', sku: 'SKU001', price: 100, stock: 50 },
        { name: 'Product 2', sku: 'SKU002', price: 200, stock: 30 },
        // Tạo 1 triệu bản ghi với dữ liệu ngẫu nhiên
        ...Array(1000000).fill(0).map((_, i) => ({
          name: `Product ${i + 3}`,
          sku: `SKU${i + 3}`,
          price: Math.floor(Math.random() * 1000),
          stock: Math.floor(Math.random() * 100),
          isActive: true,
        })),
      ];

      // Chèn dữ liệu vào MongoDB
      await this.productModel.insertMany(seedData);
      console.log('Seed data inserted successfully');
    }catch (error) {
      console.error('Error while seeding data:', error);
      return false;
    }
    
    return true;
  }

  public async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  public async findUserByName_static_method(name: string): Promise<UserDocument | null> {
    return this.userModel.findByNameeeee(name); // Gọi phương thức static của model
  }

  public async addUser(user: User): Promise<string> 
   {
    const newUser = new this.userModel(user);
    
    // return await newUser.save().then((doc) => {
    //   console.log('User added successfully:', doc);
    // }).catch((error) => {
    //   console.error('Error while adding user:', error);
    // });

    return await newUser.save().then((doc) => {
      console.log('User added successfully:', doc);
      return doc;
    }
    ).catch((error) => {
      const error_message = error.message;
      console.error('Error while adding user:', error_message);
      return error_message;
    });
  }

  public async keep_10_first_product() {
    await this.productModel.find().limit(10).exec().then( async (products) => {
      console.log('10 product to keep: ', products.map(product => product.name));
      await this.productModel.deleteMany({ name: { $nin: products.map(product => product.name) } }).then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.error('error', error);
      })
    })
  }

}


