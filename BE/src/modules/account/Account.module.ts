import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AccountController } from './Account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/database/schemas/account/account.schema';
import { Role, RoleSchema } from 'src/database/schemas/role/role.schema';
import { TherapistBackground, TherapistBackgroundSchema } from 'src/database/schemas/therapistBackground/therapistBackground.schema';
import { RestSchedule, RestScheduleSchema } from 'src/database/schemas/restSchedule/restSchedule.schema';
import { WorkShift, WorkShiftSchema } from 'src/database/schemas/workShift/workShift.schema';
import { AccountsService } from './services/accounts.service';
import { TherapistAccountsService } from './services/therapistAccounts.service';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { RoleRepository } from 'src/database/schemas/role/role.repository';
import { TherapistBackgroundRepository } from 'src/database/schemas/therapistBackground/therapistBackground.repository';
import { RestScheduleRepository } from 'src/database/schemas/restSchedule/restSchedule.repository';
import { WorkShiftRepository } from 'src/database/schemas/workShift/workShift.repository';
import { JwtService } from 'src/common/services/jwt.service';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { Service, ServiceSchema } from 'src/database/schemas/service/service.schema';
import { BookingModule } from '../booking/Booking.module';
import { ServiceModule } from '../service/Service.module';
import { FileService } from 'src/common/services/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },                        // accounts
      { name: Role.name, schema: RoleSchema },                              // roles
      { name: TherapistBackground.name, schema: TherapistBackgroundSchema },// therapistBackgrounds
      { name: Service.name, schema: ServiceSchema },                        // services
      { name: RestSchedule.name, schema: RestScheduleSchema },              // restSchedules
      { name: WorkShift.name, schema: WorkShiftSchema },                    // workShifts
    ]),
    BookingModule,
    ServiceModule
  ],
  controllers: [AccountController],
  providers: [
    // Repositories
    AccountRepository,
    RoleRepository,
    TherapistBackgroundRepository,
    RestScheduleRepository,
    WorkShiftRepository,
    

    // Inner Services
    AccountsService,
    TherapistAccountsService,

    // Common Services
    JwtService,
    BcryptService,
    FileService


  ],
  exports: [
    // Repositories
    AccountRepository,
    RestScheduleRepository,
    WorkShiftRepository,
    
    // Inner Services
    AccountsService,
    TherapistAccountsService,
  ]
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(

    ).forRoutes(
    );
  }
}
