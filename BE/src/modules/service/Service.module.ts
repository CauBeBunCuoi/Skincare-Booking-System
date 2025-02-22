import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServiceController } from './Service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from 'src/database/schemas/service/service.schema';
import { ServiceType, ServiceTypeSchema } from 'src/database/schemas/serviceType/serviceType.schema';
import { TherapistService, TherapistServiceSchema } from 'src/database/schemas/therapistService/therapistService.schema';
import { ServiceSkinType, ServiceSkinTypeSchema } from 'src/database/schemas/serviceSkinType/serviceSkinType.schema';
import { ServiceSkinStatus, ServiceSkinStatusSchema } from 'src/database/schemas/serviceSkinStatus/serviceSkinStatus.schema';
import { SkinType, SkinTypeSchema } from 'src/database/schemas/skinType/skinType.schema';
import { SkinStatus, SkinStatusSchema } from 'src/database/schemas/skinStatus/skinStatus.schema';
import { ServicesService } from './services/services.service';
import { SkinService } from './services/skin.service';
import { ServiceRepository } from 'src/database/schemas/service/service.repository';
import { ServiceTypeRepository } from 'src/database/schemas/serviceType/serviceType.repository';
import { TherapistServiceRepository } from 'src/database/schemas/therapistService/therapistService.repository';
import { ServiceSkinTypeRepository } from 'src/database/schemas/serviceSkinType/serviceSkinType.repository';
import { ServiceSkinStatusRepository } from 'src/database/schemas/serviceSkinStatus/serviceSkinStatus.repository';
import { SkinTypeRepository } from 'src/database/schemas/skinType/skinType.repository';
import { SkinStatusRepository } from 'src/database/schemas/skinStatus/skinStatus.repository';
import { ServiceStep, ServiceStepSchema } from 'src/database/schemas/serviceStep/serviceStep.schema';
import { ServiceStepRepository } from 'src/database/schemas/serviceStep/serviceStep.repository';
import { FileService } from 'src/common/services/file.service';
import { AccountModule } from '../account/Account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },                        // services
      { name: ServiceType.name, schema: ServiceTypeSchema },                // serviceTypes  
      { name: ServiceStep.name, schema: ServiceStepSchema },                // serviceSteps                        
      { name: TherapistService.name, schema: TherapistServiceSchema },      // therapistServices
      { name: ServiceSkinType.name, schema: ServiceSkinTypeSchema },        // serviceSkinTypes
      { name: ServiceSkinStatus.name, schema: ServiceSkinStatusSchema },    // serviceSkinStatuses
      { name: SkinType.name, schema: SkinTypeSchema },                      // skinTypes
      { name: SkinStatus.name, schema: SkinStatusSchema },                  // skinStatuses
    ]),
    forwardRef(() => AccountModule),
  ],
  controllers: [ServiceController],
  providers: [
    // Repositories
    ServiceRepository,
    ServiceTypeRepository,
    ServiceStepRepository,
    TherapistServiceRepository,
    ServiceSkinTypeRepository,
    ServiceSkinStatusRepository,
    SkinTypeRepository,
    SkinStatusRepository,

    // Inner Services
    ServicesService,
    SkinService,

    // Common Services
    FileService
  ],
  exports: [
    // Repositories
    ServiceRepository,
    ServiceTypeRepository,
    TherapistServiceRepository,

    // Inner Services
    ServicesService,
    SkinService
  ]
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(

    ).forRoutes(
    );
  }
}