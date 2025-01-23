import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AccountController } from './Account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/database/schemas/account/account.schema';
import { Role, RoleSchema } from 'src/database/schemas/role/role.schema';
import { TherapistBackground, TherapistBackgroundSchema } from 'src/database/schemas/therapistBackground/therapistBackground.schema';
import { RestSchedule, RestScheduleSchema } from 'src/database/schemas/restSchedule/restSchedule.schema';
import { WorkShift, WorkShiftSchema } from 'src/database/schemas/workShift/workShift.schema';
import { AccountsService } from './services/accounts.service';
import { TherapistsService } from './services/therapists.service';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { RoleRepository } from 'src/database/schemas/role/role.repository';
import { TherapistBackgroundRepository } from 'src/database/schemas/therapistBackground/therapistBackground.repository';
import { RestScheduleRepository } from 'src/database/schemas/restSchedule/restSchedule.repository';
import { WorkShiftRepository } from 'src/database/schemas/workShift/workShift.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },                        // accounts
      { name: Role.name, schema: RoleSchema },                              // roles
      { name: TherapistBackground.name, schema: TherapistBackgroundSchema },// therapistBackgrounds
      { name: RestSchedule.name, schema: RestScheduleSchema },              // restSchedules
      { name: WorkShift.name, schema: WorkShiftSchema },                    // workShifts
    ])
  ],
  controllers: [AccountController],
  providers: [
    // Repositories
    AccountRepository,
    RoleRepository,
    TherapistBackgroundRepository,
    RestScheduleRepository,
    WorkShiftRepository,

    // Services
    AccountsService,
    TherapistsService
  ],
  exports: [
    AccountsService,
    TherapistsService
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
