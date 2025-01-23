import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { SkinService } from './services/skin.service';

@Controller('service')
export class ServiceController {

  constructor(
    private readonly servicesService: ServicesService,
    private readonly skinService: SkinService,
  ) { }

}
