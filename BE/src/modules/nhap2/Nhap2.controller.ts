import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Nhap2Service } from './Nhap2.service';
import { NhapService } from '../nhap/services/Nhap.service';

@Controller('nhap2')
export class Nhap2Controller {
  constructor(
    private readonly appService: AppService,
    private readonly nhap2Service: Nhap2Service,
    private readonly nhapService: NhapService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello_1')
  getHello_1(): string {
    return this.nhap2Service.getHelloNhap_2();
  }

  @Get('hello_2')
  getHello_2(): string {
    return this.nhapService.getHelloNhap_1();
  }
}
