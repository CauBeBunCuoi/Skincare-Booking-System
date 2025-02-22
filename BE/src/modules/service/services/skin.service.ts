import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
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

    async getExistSkinType(skinTypeId: number): Promise<any> {
        const skinType = await this.skinTypeRepository.findById(skinTypeId);
        if (!skinType) {
            throw new HttpException('Skin type not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return skinType;
    }

    async getExistSkinStatus(skinStatusId: number): Promise<any> {
        const skinStatus = await this.skinStatusRepository.findById(skinStatusId);
        if (!skinStatus) {
            throw new HttpException('Skin status not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return skinStatus;
    }

    async getExistService(serviceId: Types.ObjectId): Promise<any> {
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new HttpException('Service not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return service;
    }

    //////////////////////////////////////////////

    async getSkinTypes(): Promise<any> {
        return this.skinTypeRepository.findAll();
    }

    async getSkinStatuses(): Promise<any> {
        return this.skinStatusRepository.findAll();
    }

    async updateSkinTypes(serviceId: Types.ObjectId, skinTypeIds: number[]): Promise<any> {
        await this.getExistService(serviceId);
        for (const skinTypeId of skinTypeIds) {
            await this.getExistSkinType(skinTypeId);
        }
        try{
            await this.serviceSkinTypeRepository.deleteByServiceId(serviceId);
            for (const skinTypeId of skinTypeIds) {
                await this.serviceSkinTypeRepository.create({ serviceId : new Types.ObjectId(serviceId), skinId: skinTypeId });
            }

        } catch (error) {
            throw new HttpException('Update skin types failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async updateSkinStatuses(serviceId: Types.ObjectId, skinStatusIds: number[]): Promise<any> {
        await this.getExistService(serviceId);
        for (const skinStatusId of skinStatusIds) {
            await this.getExistSkinStatus(skinStatusId);
        }
        try{
            await this.serviceSkinStatusRepository.deleteByServiceId(serviceId);
            for (const skinStatusId of skinStatusIds) {
                await this.serviceSkinStatusRepository.create({ serviceId : new Types.ObjectId(serviceId), statusId: skinStatusId });
            }

        } catch (error) {
            throw new HttpException('Update skin statuses failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
