import { Account, AccountSchema } from "./schemas/account/account.schema";
import { Booking, BookingSchema } from "./schemas/booking/booking.schema";
import { BookingStatus, BookingStatusSchema } from "./schemas/bookingStatus/bookingStatus.schema";
import { ExecutionResult, ExecutionResultSchema } from "./schemas/executionResult/executionResult.schema";
import { Feedback, FeedbackSchema } from "./schemas/feedback/feedback.schema";
import { QuizOption, QuizOptionSchema } from "./schemas/quizOption/quizOption.schema";
import { QuizOptionService, QuizOptionServiceSchema } from "./schemas/quizOptionService/quizOptionService.schema";
import { QuizQuestion, QuizQuestionSchema } from "./schemas/quizQuestion/quizQuestion.schema";
import { RestSchedule, RestScheduleSchema } from "./schemas/restSchedule/restSchedule.schema";
import { Role, RoleSchema } from "./schemas/role/role.schema";
import { Service, ServiceSchema } from "./schemas/service/service.schema";
import { ServiceSkinStatus, ServiceSkinStatusSchema } from "./schemas/serviceSkinStatus/serviceSkinStatus.schema";
import { ServiceSkinType, ServiceSkinTypeSchema } from "./schemas/serviceSkinType/serviceSkinType.schema";
import { ServiceStep, ServiceStepSchema } from "./schemas/serviceStep/serviceStep.schema";
import { ServiceType, ServiceTypeSchema } from "./schemas/serviceType/serviceType.schema";
import { SkinStatus, SkinStatusSchema } from "./schemas/skinStatus/skinStatus.schema";
import { SkinType, SkinTypeSchema } from "./schemas/skinType/skinType.schema";
import { TherapistBackground, TherapistBackgroundSchema } from "./schemas/therapistBackground/therapistBackground.schema";
import { TherapistService, TherapistServiceSchema } from "./schemas/therapistService/therapistService.schema";
import { WorkShift, WorkShiftSchema } from "./schemas/workShift/workShift.schema";


export const databaseFeatures = [
  { name: Account.name, schema: AccountSchema },                        // accounts
  { name: Role.name, schema: RoleSchema },                              // roles
  { name: TherapistBackground.name, schema: TherapistBackgroundSchema },// therapistBackgrounds
  { name: RestSchedule.name, schema: RestScheduleSchema },              // restSchedules
  { name: WorkShift.name, schema: WorkShiftSchema },                    // workShifts

  { name: Service.name, schema: ServiceSchema },                        // services
  { name: ServiceType.name, schema: ServiceTypeSchema },                // serviceTypes  
  { name: ServiceStep.name, schema: ServiceStepSchema },                // serviceSteps           
  { name: TherapistService.name, schema: TherapistServiceSchema },      // therapistServices
  { name: ServiceSkinType.name, schema: ServiceSkinTypeSchema },        // serviceSkinTypes
  { name: ServiceSkinStatus.name, schema: ServiceSkinStatusSchema },    // serviceSkinStatuses
  { name: SkinType.name, schema: SkinTypeSchema },                      // skinTypes
  { name: SkinStatus.name, schema: SkinStatusSchema },                  // skinStatuses
  
  { name: Booking.name, schema: BookingSchema },                        // bookings
  { name: BookingStatus.name, schema: BookingStatusSchema },            // bookingStatuses
  { name: Feedback.name, schema: FeedbackSchema },                      // feedbacks
  { name: ExecutionResult.name, schema: ExecutionResultSchema },        // executionResults

  { name: QuizQuestion.name, schema: QuizQuestionSchema },              // quizQuestions
  { name: QuizOption.name, schema: QuizOptionSchema },                  // quizOptions
  { name: QuizOptionService.name, schema: QuizOptionServiceSchema },    // quizOptionServices
];
