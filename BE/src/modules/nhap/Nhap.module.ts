import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NhapController } from './Nhap.controller';
import { AppService } from 'src/app.service';
import { Nhap2Service } from '../nhap2/Nhap2.service';
import { NhapMiddleware_2 } from './middlewares/NhapMiddleware_2.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { NhapGuard_1 } from './guards/NhapGuard_1.guard';
import { NhapInterceptor_1 } from './interceptors/NhapInterceptor_1.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { NhapMiddleware_3 } from './middlewares/NhapMiddleware_3.middleware';
import { Category, CategorySchema } from 'src/database/schemas/category/category.schema';
import { Product, ProductSchema } from 'src/database/schemas/product/product.schema';
import { User, UserSchema } from 'src/database/schemas/user/user.schema';
import { Role, RoleSchema } from 'src/database/schemas/role/role.schema';
import { NhapService } from './services/Nhap.service';
import { NhapService_1 } from './services/NhapService_1.service';
import { NhapService_2 } from './services/NhapService_2.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { NhapMiddleware_1 } from './middlewares/NhapMiddleware_1.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([ // [ĐĂNG KÝ] Import Schema vào module, để có thể inject vào service hay controller thì chỉ có cách forFeature trong import của module cần sử dụng
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema},
      { name: User.name, schema: UserSchema},
      { name: Role.name, schema: RoleSchema},
    ]) 
  ],
  controllers: [NhapController],  // [ĐĂNG KÝ] Controller tại đây
  providers: [

    AppService,
    
    NhapService,
    NhapService_1,
    NhapService_2,
    Nhap2Service,
    // {
    //   provide: NhapService,
    //   useFactory: (nhapService1: NhapService_1) => new NhapService(nhapService1),
    //   inject: [forwardRef(() => NhapService_1)],
    // },
    // {
    //   provide: NhapService_1,
    //   useFactory: (nhapService: NhapService) => new NhapService_1(nhapService),
    //   inject: [forwardRef(() => NhapService)],
    // },

    {                             // [ĐĂNG KÝ] Guard toàn cục tại đây
      provide: APP_GUARD,
      useClass: NhapGuard_1,
    },
    {                             // [ĐĂNG KÝ] Interceptor toàn cục tại đây
      provide: APP_INTERCEPTOR,
      useClass: NhapInterceptor_1,
    },
    {                             // [ĐĂNG KÝ] Filter toàn cục tại đây            
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [                      // [ĐĂNG KÝ] Export các function để có thể inject vào các module khác ở dạng tham chiếu chung, điều kiện inject này chỉ có thể là import module đã export service vào module cần inject
    NhapService
  ]
})
export class NhapModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ** xứ lí middleware thực thi từ trên xuống theo thứ tự consumer.apply() được khai từ trên xuống 
    consumer
      .apply(
        NhapMiddleware_1
      ).forRoutes(
        { path: 'nhap/*', method: RequestMethod.ALL }
      );

    consumer
      .apply(
        NhapMiddleware_3,
        NhapMiddleware_2
      ) // [ĐĂNG KÝ] middleware theo thứ tự thực thi từ trên xuống
      .forRoutes(
        { path: 'nhap/hello_1', method: RequestMethod.GET },
        { path: 'nhap/hello_2', method: RequestMethod.POST },
        { path: 'nhap/test_middlewares', method: RequestMethod.POST },
        { path: 'nhap/test_all/*', method: RequestMethod.ALL }
      ); // áp dụng middleware đã apply() theo thứ tự trên cho tất cả các route



  }

}
