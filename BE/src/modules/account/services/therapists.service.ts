import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { RestScheduleRepository } from 'src/database/schemas/restSchedule/restSchedule.repository';
import { RoleRepository } from 'src/database/schemas/role/role.repository';
import { TherapistBackgroundRepository } from 'src/database/schemas/therapistBackground/therapistBackground.repository';
import { WorkShiftRepository } from 'src/database/schemas/workShift/workShift.repository';

@Injectable()
export class TherapistsService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly roleRepository: RoleRepository,
        private readonly therapistBackgroundRepository: TherapistBackgroundRepository,
        private readonly restScheduleRepository: RestScheduleRepository,
        private readonly workShiftRepository: WorkShiftRepository,
    ) { }


}
