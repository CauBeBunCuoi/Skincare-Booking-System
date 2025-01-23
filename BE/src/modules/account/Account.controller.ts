import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { TherapistsService } from './services/therapists.service';

@Controller('account')
export class AccountController {
  
  constructor(
    private readonly accountsService: AccountsService,
    private readonly therapistsService: TherapistsService,
  ) { }

}
