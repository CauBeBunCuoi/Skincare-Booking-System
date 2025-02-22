import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { TherapistAccountsService } from './services/therapistAccounts.service';
import { HttpExceptionFilter } from 'src/common/filters/HttpException.filter';
import { get, Types } from 'mongoose';
import { Account } from 'src/database/schemas/account/account.schema';
import { TherapistService } from 'src/database/schemas/therapistService/therapistService.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileService } from 'src/common/services/file.service';

@Controller('accounts')
@UseFilters(HttpExceptionFilter)
export class AccountController {

  constructor(
    private readonly accountsService: AccountsService,
    private readonly therapistAccountsService: TherapistAccountsService,

    private readonly configService: ConfigService,
    private readonly fileService: FileService,

  ) { }

  // Đăng nhập tài khoản
  @Post('login')
  async login(
    @Body() body: { username: string, password: string }
  ) {
    const token = await this.accountsService.login(body.username, body.password);
    return {
      "token": "Bearer " + token,
      "message": "Login successfully"
    };
  }

  // Đăng ký tài khoản mới cho customer
  @Post('register')
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  async register(
    @Body() body: {
      account: Account,
      imageBase64: string
    }
  ) {
    await this.accountsService.addAccount({ ...body.account, roleId: 1 }, body.imageBase64);
    return { message: 'Register successfully' };
  }

  // Thêm account mới
  @Post('')
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  async addAccount(
    @Body() body: {
      account: Account,
      imageBase64: string
    }
  ) {
    await this.accountsService.addAccount(body.account, body.imageBase64);
    return { message: 'Add account successfully' };
  }

  // Lấy danh sách accounts nhân viên
  @Get('staffs')
  async getStaff() {
    const accounts = await this.accountsService.getAllStaff();
    return {
      "accounts": accounts,
    };
  }

  // Lấy danh sách accounts khách hàng
  @Get('customers')
  async getCustomer() {
    const accounts = await this.accountsService.getAllCustomer();
    return {
      "accounts": accounts,
    };
  }

  // Lấy account detail (không gồm danh sách background, service đảm nhiệm và lịch nghỉ)
  @Get(':accountId')
  async getAccountById(
    @Param('accountId') accountId: Types.ObjectId
  ) {
    const account = await this.accountsService.getAccountDetail(accountId);
    return {
      "account": account,
    };
  }

  // Cập nhật account
  @Post(':accountId')
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  async updateAccountById(
    @Param('accountId') accountId: Types.ObjectId,
    @Body() body: {
      account: Account,
      imageBase64: string
    }
  ) {
    await this.accountsService.updateAccount(accountId, body.account, body.imageBase64);
    return { message: 'Update successfully' };
  }

  // Xóa account
  @Delete(':accountId')
  async deleteAccountById(
    @Param('accountId') accountId: Types.ObjectId
  ) {
    await this.accountsService.deleteAccount(accountId);
    return { message: 'Delete successfully' };
  }

  // Lấy therapist detail (bao gồm therapist-services, therapist-backgrounds và feedback-rate)
  @Get(':accountId/therapist-detail')
  async getTherapistDetail(
    @Param('accountId') accountId: Types.ObjectId
  ) {
    const therapist_info = await this.therapistAccountsService.getTherapistDetails(accountId);
    return {
      "therapist": therapist_info.therapist,
      "services": therapist_info.services,
      "backgrounds": therapist_info.backgrounds,
      "restSchedules": therapist_info.restSchedules,
      "feedbackRates": therapist_info.feedbackRates,
      "analyzing" : therapist_info.analyzing
    };
  }

  // Lấy therapist selection (bao gồm feedback-rate và therapist-backgrounds)
  @Get(':accountId/therapist-selection')
  async getTherapistSelection(
    @Param('accountId') accountId: Types.ObjectId
  ) {
    const therapist_info = await this.therapistAccountsService.getTherapistSelection(accountId);
    return {
      "therapist": therapist_info.therapist,
      "feedbackRates": therapist_info.feedbackRates,
      "backgrounds": therapist_info.backgrounds,
      "analyzing" : therapist_info.analyzing
    };
  }

  // Thêm danh sách services cho therapist
  @Post(':accountId/therapist-services')
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  async addTherapistServices(
    @Param('accountId') accountId: Types.ObjectId,
    @Body() body: { serviceId: Types.ObjectId, experienceYears: number }[]
  ) {
    await this.therapistAccountsService.addTherapistServices(accountId, body);
    return { message: 'Add therapist services successfully' };
  }

  // Xóa một service của therapist
  @Delete(':accountId/therapist-services/:serviceId')
  async deleteTherapistService(
    @Param('accountId') accountId: Types.ObjectId,
    @Param('serviceId') serviceId: Types.ObjectId
  ) {
    await this.therapistAccountsService.deleteTherapistService(accountId, serviceId);
    return { message: 'Delete therapist service successfully' };
  }

  // Thêm danh sách background cho therapist
  @Post(':accountId/therapist-backgrounds')
  async addTherapistBackground(
    @Param('accountId') accountId: Types.ObjectId,
    @Body() body: { description: string }[]
  ) {
    await this.therapistAccountsService.addTherapistBackgrounds(accountId, body);
    return { message: 'Add therapist background successfully' };
  }

  // Xóa một background của therapist
  @Delete(':accountId/therapist-backgrounds/:backgroundId')
  async deleteTherapistBackground(
    @Param('accountId') accountId: Types.ObjectId,
    @Param('backgroundId') backgroundId: Types.ObjectId
  ) {
    await this.therapistAccountsService.deleteTherapistBackground(accountId, backgroundId);
    return { message: 'Delete therapist background successfully' };
  }

  // Thêm một lịch nghỉ ngơi cho staff
  @Post(':accountId/rest-schedule')
  async addRestSchedule(
    @Param('accountId') accountId: Types.ObjectId,
    @Body() body: { restDate: string, workShiftId: number }
  ) {
    await this.therapistAccountsService.addRestSchedule(accountId, body);
    return { message: 'Add rest schedule successfully' };
  }

  // Xóa một lịch nghỉ ngơi của staff
  @Delete(':accountId/rest-schedule/:scheduleId')
  async deleteRestSchedule(
    @Param('accountId') accountId: Types.ObjectId,
    @Param('scheduleId') scheduleId: Types.ObjectId
  ) {
    await this.therapistAccountsService.deleteRestSchedule(accountId, scheduleId);
    return { message: 'Delete rest schedule successfully' };
  }






  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  @Get('test/hello')
  async hello() {
    return { message: 'Hello' };
  }

  @Get('test/test_exception')
  async test_exception(
    @Body() body: { password: string }
  ) {
    throw new HttpException('Test exception', 500);
  }

  @Get('test/test_undeleteAllAccount')
  async test_undeleteAllAccount() {
    await this.accountsService.undeleteAllAccount();
    return { message: 'Undelete all account successfully' };
  }

  @Post('test/test_uploadImage')
  async test_uploadImage(
    @Body() body: { image: string }
  ) {
    const folderPath = this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH');
    await this.fileService.saveBase64File(body.image, folderPath, "ngu_2");
    return { message: 'Upload image successfully' };
  }

  @Post('test/test_deleteImage')
  async test_deleteImage(
    @Body() body: { image: string }
  ) {
    const folderPath = this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH');
    await this.fileService.deleteFile(folderPath, body.image);
    return { message: 'Delete image successfully' };
  }

  @Post('test/test_deleteFolder')
  async test_deleteFolder(
    @Body() body: { image: string }
  ) {
    const folderPath = this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH');
    await this.fileService.deleteFolder(folderPath + "/nguuuuuu");
    return { message: 'Delete image successfully' };
  }

  @Post('test/test_copyFile')
  async test_copyFile(
    @Body() body: { image: string }
  ) {
    const folderPath = this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH');
    const sourcePath = folderPath ;
    const sourceFileName = "unknown.jpg";
    const destinationPath = folderPath + "/hahaha";
    const destinationFileName = "unknown_222.jpg";
    await this.fileService.copyFile(sourcePath,sourceFileName, destinationPath,destinationFileName);
    return { message: 'Copy image successfully' };
  }





}
