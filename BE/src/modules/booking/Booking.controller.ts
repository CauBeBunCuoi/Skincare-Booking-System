import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookingsService } from './services/bookings.service';

@Controller('booking')
export class BookingController {
  
  constructor(
    private readonly bookingsService: BookingsService,
  ) { }

}
