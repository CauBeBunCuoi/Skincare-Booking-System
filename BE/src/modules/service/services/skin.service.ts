import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { Account, AccountModel } from 'src/database/schemas/account/account.schema';
import { ServiceRepository } from 'src/database/schemas/service/service.repository';
import { ServiceSkinStatusRepository } from 'src/database/schemas/serviceSkinStatus/serviceSkinStatus.repository';
import { ServiceSkinTypeRepository } from 'src/database/schemas/serviceSkinType/serviceSkinType.repository';
import { ServiceStepRepository } from 'src/database/schemas/serviceStep/serviceStep.repository';
import { ServiceTypeRepository } from 'src/database/schemas/serviceType/serviceType.repository';
import { SkinStatusRepository } from 'src/database/schemas/skinStatus/skinStatus.repository';
import { SkinTypeRepository } from 'src/database/schemas/skinType/skinType.repository';
import { TherapistServiceRepository } from 'src/database/schemas/therapistService/therapistService.repository';

@Injectable()
export class SkinService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        private readonly serviceTypeRepository: ServiceTypeRepository,
        private readonly serviceStepRepository: ServiceStepRepository,
        private readonly therapistServiceRepository: TherapistServiceRepository,
        private readonly serviceSkinTypeRepository: ServiceSkinTypeRepository,
        private readonly serviceSkinStatusRepository: ServiceSkinStatusRepository,
        private readonly skinTypeRepository: SkinTypeRepository,
        private readonly skinStatusRepository: SkinStatusRepository,
    ) { }


}
