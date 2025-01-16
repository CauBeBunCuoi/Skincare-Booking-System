import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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


const generateJWT_OneSecretKey = (payload: object, expiresIn: string | number): string => {
  try {
    const token = jwt.sign(payload, JwtConfig.SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Could not generate JWT');
  }
};

const generateJWT_TwoPublicPrivateKey = (payload: object, expiresIn: string | number): string => {
  try {
    const privateKey = fs.readFileSync(join(process.cwd(), JwtConfig.PRIVATE_KEY_PATH)).toString();

    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Could not generate JWT');
  }
}



@Controller('nhap')
@Roles('Admin', 'SuperAdmin', 'User')
@UseGuards(CheckMetaData)
export class NhapController {


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


  @Get()
  getHello(): string {
    console.log("Xử lí trong Controller...");
    return this.appService.getHello();
  }

  @Get('hello_1')
  getHello_1(): string {
    console.log("Xử lí trong Controller...");
    return this.nhapService.getHelloNhap_1();
  }

  @Get('hello_2')
  getHello_2(): string {
    console.log("Xử lí trong Controller...");
    return this.nhap2Service.getHelloNhap_2();
  }

  //////////// test All ////////////
  @Get('test_all/:id')
  @UseGuards(NhapGuard_checkHeaderKey, NhapGuard_checkHeaderId)     // [ĐĂNG KÝ] Guard, thực theo thứ tự tham số truyền vào @UseGuards()
  @UseInterceptors(FileInterceptor(''))                             // [ĐĂNG KÝ] Interceptor này để có thể lấy form-data từ client
  @UseInterceptors(NhapInterceptor_3, NhapInterceptor_2)            // [ĐĂNG KÝ] Interceptor, thực theo thứ tự tham số truyền vào @UseInterceptors()

  test_all(
    @Query('name', new NhapPipe_forString()) name: string,
    @Param('id', new NhapPipe_forInteger()) id: number
  ): string {
    console.log("Xử lí trong Controller...");
    return 'test_all';
  }

  //////////// test middlewares ////////////
  @Post('test_middlewares')
  test_middlewares(): string {
    console.log("Xử lí trong Controller...");
    return 'test_middlewares';
  }

  //////////// test pipe ////////////
  @Post('test_pipe')
  @UseInterceptors(FileInterceptor(''))  // [ĐĂNG KÝ] Interceptor này để có thể lấy form-data từ client
  @UsePipes(NhapPipe_1)                  // [ĐĂNG KÝ] Pipe này để xử lí dữ liệu đầu vào từ client
  validateInput(@Body() body: { name: string }) {
    console.log("Xử lí trong Controller...");
    console.log("data @Body from Pipe NHAP 1: ", body);
    return { message: `Hello, ${body}!` };
  }

  @Post('test_pipe_1/:id')
  @UseInterceptors(FileInterceptor(''))  // [ĐĂNG KÝ] Interceptor này để có thể lấy form-data từ client
  @UsePipes(NhapPipe_1)  // Pipe này sẽ đi qua từng tham số theo thứ tự (body, id) để handle xử lí và trả về giá trị mới
  test_pipe_1(
    @Body() body: { name: string },
    @Param('id') id: string
  ) {
    console.log("Xử lí trong Controller...");
    console.log("data @Body from Pipe NHAP 1: ", body);
    console.log("data @Param from Pipe NHAP 1: ", id);
    return { message: `Hello, ${body}!` };
  }

  @Get('test_pipe_2/:id')
  @UseInterceptors(FileInterceptor(''))   // [ĐĂNG KÝ] Interceptor này để có thể lấy form-data từ client
  test_pipe_2(
    // [LƯU Ý]: dữ liệu đầu vào mặc định là string => cần ép kiểu nếu muốn sử dụng kiểu khác như số (Number())
    @Query('name', new NhapPipe_forString()) name: string,
    @Param('id', new NhapPipe_forInteger()) id: number
  ) {
    console.log("Xử lí trong Controller...");
    console.log("data @Query from Pipe ForString: ", name);
    console.log("data @Param from Pipe ForInteger: ", id);
    return { message: `Hello, ${name}!, id: ${id}` };
  }


  //////////// test guard ////////////
  @Get('test_guard')
  @UseGuards(NhapGuard_checkHeaderKey, NhapGuard_checkHeaderId)     // [ĐĂNG KÝ] Guard, thực thi theo thứ tự tham số truyền vào @UseGuards()
  test_guard() {
    console.log("Xử lí trong Controller...");
    return { message: `Hello` };
  }

  @Post('getJWT_OneSecretKey')
  @UseInterceptors(FileInterceptor(''))
  async getJWT_OneSecretKey(
    @Body() body: { name: string }
  ): Promise<{ token: string, account: any }> {
    var name = body.name.trim();
    console.log("Xử lí trong Controller getJWT...");
    const user = await this.userModel.findOne({ name }).lean();

    if (!user) {
      throw new Error(`User with name "${name}" not found`);
    }

    // Lấy role_id từ tài liệu user và truy vấn trong Role collection
    const role = await this.roleModel.findById(user.role_id).lean();

    if (!role) {
      throw new Error(`Role with ID "${user.role_id}" not found`);
    }

    // Thay thế trường role_id trong user bằng đối tượng role
    const account = {
      ...user,
      role: role, // Thay thế role_id bằng đối tượng role
    };

    const token = generateJWT_OneSecretKey(account, '1h');
    return {
      token: 'Bearer ' + token,
      account
    };
  }

  @Post('getJWT_TwoPublicPrivateKey')
  @UseInterceptors(FileInterceptor(''))
  async getJWT_TwoPublicPrivateKey(
    @Body() body: { name: string }
  ): Promise<{ token: string, account: any }> {
    var name = body.name.trim();
    console.log("Xử lí trong Controller getJWT...");
    const user = await this.userModel.findOne({ name }).lean();

    if (!user) {
      throw new Error(`User with name "${name}" not found`);
    }

    // Lấy role_id từ tài liệu user và truy vấn trong Role collection
    const role = await this.roleModel.findById(user.role_id).lean();

    if (!role) {
      throw new Error(`Role with ID "${user.role_id}" not found`);
    }

    // Thay thế trường role_id trong user bằng đối tượng role
    const account = {
      ...user,
      role: role, // Thay thế role_id bằng đối tượng role
    };

    const token = generateJWT_TwoPublicPrivateKey(account, '1h');
    return {
      token: 'Bearer ' + token,
      account
    };
  }

  @Get('test_guard_1/manual-guard/OneSecretKey_JWT_CHECKING')
  @Roles('Admin', 'SuperAdmin')                                           // [ĐĂNG KÝ] Custom Decorator
  @UseGuards(AuthGuard_Manual, JwtCheckGuard, RolesGuard)                 // [ĐĂNG KÝ] Guard, thực thi theo thứ tự tham số truyền vào @UseGuards()
  @JwtOption('secret')                                                    // [ĐĂNG KÝ] Custom Decorator
  OneSecretKey_JWT_CHECKING_manual() {
    console.log("XÁC THỰC JWT...");
    return { message: `Truy cập với role thành công với role USER` };
  }


  @Get('test_guard_1/manual-guard/TwoPublicPrivateKey_JWT_CHECKING')
  @Roles('Admin', 'SuperAdmin', 'User')                                   // [ĐĂNG KÝ] Custom Decorator
  @JwtOption('public_private')                                            // [ĐĂNG KÝ] Custom Decorator
  @UseGuards(AuthGuard_Manual, JwtCheckGuard, RolesGuard)                 // [ĐĂNG KÝ] Guard, thực thi theo thứ tự tham số truyền vào @UseGuards()
  TwoPublicPrivateKey_JWT_CHECKING_manual() {
    console.log("XÁC THỰC JWT...");
    return { message: `Truy cập với role thành công với role USER` };
  }

  @Get('test_guard_1/option-guard/OneSecretKey_JWT_CHECKING')
  @Roles('Admin', 'SuperAdmin', 'User')                                   // [ĐĂNG KÝ] Custom Decorator
  @UseGuards(JwtCheckGuard_With_Option('secret'), RolesGuard)             // [ĐĂNG KÝ] Guard, thực thi theo thứ tự tham số truyền vào @UseGuards()
  OneSecretKey_JWT_CHECKING_option() {
    console.log("XÁC THỰC JWT...");
    return { message: `Truy cập với role thành công với role USER` };
  }

  @Get('test_guard_1/option-guard/TwoPublicPrivateKey_JWT_CHECKING')
  @Roles('Admin', 'SuperAdmin', 'User')                                   // [ĐĂNG KÝ] Custom Decorator
  @UseGuards(JwtCheckGuard_With_Option('public_private'), RolesGuard)     // [ĐĂNG KÝ] Guard, thực thi theo thứ tự tham số truyền vào @UseGuards()
  TwoPublicPrivateKey_JWT_CHECKING_option() {
    console.log("XÁC THỰC JWT...");
    return { message: `Truy cập với role thành công với role USER` };
  }



  //////////// test interceptor ////////////
  @Get('test_interceptor')
  @UseInterceptors(NhapInterceptor_3, NhapInterceptor_2)            // [ĐĂNG KÝ] Interceptor, thực thi theo thứ tự tham số truyền vào @UseInterceptors()
  test_interceptor() {
    console.log("Xử lí trong Controller...");
    return { message: `Hello` };
  }

  //////////// test filter ////////////

  //////////// test exception ////////////

  //////////// test Validator ////////////

  //** ValidationPipe (validate kiểu dữ liệu truyền vào theo class-validator)
  //** [LƯU Ý]: để có thể validate kiểu dữ liệu truyền vào theo class-validator thì cần phải khai các decorators của class-validator vào từng field trong class đối tượng (vd: @IsString(), @IsNumber(), @IsBoolean() ...)
  //** để validate trong hàm thì sử dụng plainToInstance (class-transformer) để ép kiểu + validate (class-validator) 
  @Post('test_validator')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
      exceptionFactory: (errors) => {
        console.error('---------------Validation Errors [new ValidationPipe({})] ---------------');
        console.error(errors);
        return new BadRequestException(errors);
      },
    }),
  )
  async test_validator(
    @Body() body: User
  ) {
    console.log("Xử lí trong Controller...");
    console.log("data @Body: ", body);

    const custom_User = JSON.parse(JSON.stringify(body));
    delete custom_User.name;
    delete custom_User.abc;
    console.log("custom_User: ", custom_User);

    const newUser_custom = plainToInstance(User, custom_User);  //** Ép kiểu bằng plainToInstance(class-transformer) sau này mới có thể validate được kiểu dữ liệu truyền vào theo class-validator
    // const newUser_custom = custom_User as User;              //** Cách này không thể validate được kiểu dữ liệu truyền vào theo class-validator
    console.log("newUser_custom: ", newUser_custom);

    const errors = await validate(newUser_custom);
    console.log('---------------Validation Errors [class-validator] ---------------');
    console.log(errors);
    if (errors) {
      // console.error('-----------------------------');
      // errors.forEach((error) => {
      //   console.error(Object.values(error.constraints).join(', '));
      // }
      // );
      // console.error('-----------------------------');
      throw new HttpException(errors.map((error) => Object.values(error.constraints)).join(', '), 400);
    }

  }


  //////////// test mongoDB ////////////
  // ** ĐỂ 1 service có thể inject mongoDB model thì module provider service đó CẦN PHẢI import MongooseModule.forFeature

  @Get('test_mongoDB')
  async test_mongoDB() {
    console.log("Xử lí trong Controller...");
    const allCategories = await this.nhapService.getAllCategories();
    return allCategories;
  }

  @Get('test_mongoDB_1')
  async test_mongoDB_1() {
    console.log("Xử lí trong Controller...");
    const allCategories = await this.nhapService_1.getAllCategories();
    return allCategories;
  }

  @Get('test_mongoDB_2/addRandomProduct')
  async test_mongoDB_2() {
    console.log("Xử lí trong Controller...");
    const result = await this.nhapService_2.addRandomProduct();

    return result;
  }

  @Get('test_mongoDB_3/keep_10_first_product')
  async test_mongoDB_3() {
    console.log("Xử lí trong Controller...");
    return {
      message: await this.nhapService_2.keep_10_first_product()
    };
  }

  // ** Instance Methods, Static Methods, Virtual props
  @Get('test_mongoDB_4')
  async test_mongoDB_4() {
    console.log("Xử lí trong Controller...");
    const result = await this.nhapService_2.getAllUsers();

    console.log('---------------MongoDb Instance Methods------------------');
    result.forEach((user: UserDocument) => {
      console.log(user.get_Age_Nameeeee());
    })
    console.log('---------------MongoDb Model Static Methods------------------');
    const user_from_static_method = await this.nhapService_2.findUserByName_static_method('name 3');
    console.log("findUserByName_static_method: ", user_from_static_method.get_Age_Nameeeee());
    console.log('---------------MongoDb Instance Virtual props------------------');
    console.log("Virtual props - age_toString: ", user_from_static_method.age_toString);
    return result;
  }



  //** ValidationPipe (validate kiểu dữ liệu truyền vào theo class-validator) + unique: true (index trong schema)
  @Post('test_mongoDB_5/validationPipe_uniqueIndex')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
      exceptionFactory: (errors) => {
        console.error('---------------Validation Errors [new ValidationPipe({})] ---------------');
        console.error(errors);
        return new BadRequestException(errors);
      },
    }),
  )
  async test_mongoDB_5(
    @Body() body: User
  ) {
    console.log("Xử lí trong Controller...");
    console.log("data @Body: ", body);

    const newUser = new this.userModel(body);

    const result = await this.nhapService_2.addUser(newUser);
    return result;
  }


}
