import { Injectable } from '@nestjs/common';
import { BookingRepository } from 'src/database/schemas/booking/booking.repository';
import { BookingStatusRepository } from 'src/database/schemas/bookingStatus/bookingStatus.repository';
import { ExecutionResultRepository } from 'src/database/schemas/executionResult/executionResult.repository';
import { FeedbackRepository } from 'src/database/schemas/feedback/feedback.repository';

@Injectable()
export class BookingsService {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly bookingStatusRepository: BookingStatusRepository,
        private readonly feebbackRepository: FeedbackRepository,
        private readonly executionResultRepository: ExecutionResultRepository
    ) { }

    
}
