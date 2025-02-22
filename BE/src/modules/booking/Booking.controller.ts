import { Body, Controller, Get, HttpException, Param, Post, Query, Req, Type, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookingsService } from './services/bookings.service';
import { Types } from 'mongoose';
import { JwtCheckGuard_With_Option } from 'src/common/guards/Auth/JwtCheckGuard_With_Option.guard';
import { DateTime } from 'luxon';

@Controller('bookings')
// @UseGuards(JwtCheckGuard_With_Option('public_private'))
export class BookingController {

  constructor(
    private readonly bookingsService: BookingsService,
  ) { }

  // Lấy danh sách bookings
  @Get("")
  async getBookings() {
    return {
      bookings: await this.bookingsService.getAllBooking()
    }
  }

  // Thêm mới booking
  @Post("")
  async addBooking(
    @Req() req,
    @Body() body: {
      serviceId: Types.ObjectId,
      appointmentTime: string,
      isAssigned: boolean,
      assignedTherapistId: Types.ObjectId,
    }
  ) {
    await this.bookingsService.addBooking(body, req.user);
    return { message: 'Add booking successfully' };
  }

  // Lấy danh sách bookings của account id
  @Get('accounts/:accountId')
  async getBookingsByAccountId(
    @Param('accountId') accountId: Types.ObjectId
  ) {
    return {
      bookings: await this.bookingsService.getBookingsByAccountId(accountId)
    }
  }

  // Lấy booking detail
  @Get(':bookingId')
  async getBookingDetail(
    @Param('bookingId') bookingId: Types.ObjectId
  ) {
    const booking = await this.bookingsService.getBookingDetail(bookingId);
    return booking
  }

  // Lấy danh sách lịch không theo therapist nào (trả về mảng các ngày, 1 ngày chứa các giờ available)
  @Get('services/:serviceId/schedules')
  async getAllSchedule(
    @Param('serviceId') serviceId: Types.ObjectId
  ) {
    const schedules = await this.bookingsService.getAllSchedule(serviceId);
    return {
      schedules: schedules.schedules,
      availableTherapists: schedules.availableTherapists
    }
  }

  // Lấy danh sách lịch theo therapist (trả về mảng các ngày, 1 ngày chứa các giờ available)
  @Get('services/:serviceId/accounts/:accountId/schedules')
  async getScheduleByTherapist(
    @Param('serviceId') serviceId: Types.ObjectId,
    @Param('accountId') accountId: Types.ObjectId
  ) {
    return {
      schedules: await this.bookingsService.getScheduleByTherapistId(serviceId, accountId)
    }
  }

  // Huỷ booking
  @Post(':bookingId/cancel')
  async cancelBooking(
    @Param('bookingId') bookingId: Types.ObjectId,
    @Body() body: { reason: string }
  ) {
    await this.bookingsService.cancelBooking(bookingId, body.reason);
    return { message: 'Cancel booking successfully' };
  }

  // Check-in cho booking
  @Post(':bookingId/check-in')
  async checkInBooking(
    @Param('bookingId') bookingId: Types.ObjectId
  ) {
    await this.bookingsService.checkInBooking(bookingId);
    return { message: 'Check-in booking successfully' };
  }

  // Check-out cho booking
  @Post(':bookingId/check-out')
  async checkOutBooking(
    @Param('bookingId') bookingId: Types.ObjectId
  ) {
    await this.bookingsService.checkOutBooking(bookingId);
    return { message: 'Check-out booking successfully' };
  }

  // Thêm feedback và đánh giá cho booking
  @Post(':bookingId/feedback')
  async addFeedback(
    @Param('bookingId') bookingId: Types.ObjectId,
    @Body() body: { feedbackContent: string, rate: number }
  ) {
    await this.bookingsService.addFeedback(bookingId, body);
    return { message: 'Add feedback successfully' };
  }


  // Tạo link thanh toán cho booking
  @Post(':bookingId/payment-link')
  async createPaymentLink(
    @Param('bookingId') bookingId: Types.ObjectId
  ) {
    return {
      
    }
  }

  // Phân công therapist cho booking
  @Post(':bookingId/assign-therapist')
  async assignTherapist(
    @Param('bookingId') bookingId: Types.ObjectId,
    @Body() body: { therapistId: Types.ObjectId }
  ) {
    await this.bookingsService.assignTherapist(bookingId, body.therapistId);
    return { message: 'Assign therapist successfully' };
  }
  


  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Lấy danh sách các working hours
  @Get('working-hours')
  async getWorkingHours() {
    return {
      workingHours: await this.bookingsService.get_AllWorkHours()
    }
  }
  // Lấy danh sách các unavailable hours
  @Get('unavailable-hours/:serviceId')
  async getUnavailableHours(
    @Param('serviceId') serviceId: Types.ObjectId
  ) {
    return {
      unavailableHours: await this.bookingsService.getAllSchedule(serviceId)
    }
  }

}
