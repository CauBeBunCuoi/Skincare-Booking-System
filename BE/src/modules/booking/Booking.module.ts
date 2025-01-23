import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookingController } from './Booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/database/schemas/booking/booking.schema';
import { BookingStatus, BookingStatusSchema } from 'src/database/schemas/bookingStatus/bookingStatus.schema';
import { Feedback, FeedbackSchema } from 'src/database/schemas/feedback/feedback.schema';
import { ExecutionResult, ExecutionResultSchema } from 'src/database/schemas/executionResult/executionResult.schema';
import { BookingsService } from './services/bookings.service';
import { BookingRepository } from 'src/database/schemas/booking/booking.repository';
import { BookingStatusRepository } from 'src/database/schemas/bookingStatus/bookingStatus.repository';
import { FeedbackRepository } from 'src/database/schemas/feedback/feedback.repository';
import { ExecutionResultRepository } from 'src/database/schemas/executionResult/executionResult.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },                        // bookings
      { name: BookingStatus.name, schema: BookingStatusSchema },            // bookingStatuses
      { name: Feedback.name, schema: FeedbackSchema },                      // feedbacks
      { name: ExecutionResult.name, schema: ExecutionResultSchema },        // executionResults
    ])
  ],
  controllers: [BookingController],
  providers: [
    // Repositories
    BookingRepository,
    BookingStatusRepository,
    FeedbackRepository,
    ExecutionResultRepository,

    // Services
    BookingsService
  ],
  exports: [
    BookingsService
  ]
})
export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(

    ).forRoutes(
    );
  }
}
