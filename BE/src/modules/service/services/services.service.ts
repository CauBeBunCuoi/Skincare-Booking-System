import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { of } from 'rxjs';
import { FileService } from 'src/common/services/file.service';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { Account } from 'src/database/schemas/account/account.schema';
import { ServiceRepository } from 'src/database/schemas/service/service.repository';
import { Service, ServiceModel } from 'src/database/schemas/service/service.schema';
import { ServiceSkinStatusRepository } from 'src/database/schemas/serviceSkinStatus/serviceSkinStatus.repository';
import { ServiceSkinTypeRepository } from 'src/database/schemas/serviceSkinType/serviceSkinType.repository';
import { ServiceStepRepository } from 'src/database/schemas/serviceStep/serviceStep.repository';
import { ServiceStep, ServiceStepModel } from 'src/database/schemas/serviceStep/serviceStep.schema';
import { ServiceTypeRepository } from 'src/database/schemas/serviceType/serviceType.repository';
import { ServiceType } from 'src/database/schemas/serviceType/serviceType.schema';
import { SkinStatusRepository } from 'src/database/schemas/skinStatus/skinStatus.repository';
import { SkinStatus } from 'src/database/schemas/skinStatus/skinStatus.schema';
import { SkinTypeRepository } from 'src/database/schemas/skinType/skinType.repository';
import { SkinType } from 'src/database/schemas/skinType/skinType.schema';
import { TherapistServiceRepository } from 'src/database/schemas/therapistService/therapistService.repository';

@Injectable()
export class ServicesService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        private readonly serviceTypeRepository: ServiceTypeRepository,
        private readonly serviceStepRepository: ServiceStepRepository,
        private readonly therapistServiceRepository: TherapistServiceRepository,
        private readonly serviceSkinTypeRepository: ServiceSkinTypeRepository,
        private readonly serviceSkinStatusRepository: ServiceSkinStatusRepository,
        private readonly skinTypeRepository: SkinTypeRepository,
        private readonly skinStatusRepository: SkinStatusRepository,
        private readonly accountRepository: AccountRepository,

        @InjectModel(ServiceStep.name) private serviceStepModel: ServiceStepModel,
        @InjectConnection() private readonly connection: Connection,

        private readonly fileService: FileService,
        private readonly configService: ConfigService

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

    async getExistServiceType(serviceTypeId: number): Promise<any> {
        const serviceType = await this.serviceTypeRepository.findById(serviceTypeId);
        if (!serviceType) {
            throw new HttpException('Service type not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return serviceType;
    }

    async getExistService(serviceId: Types.ObjectId): Promise<any> {
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new HttpException('Service not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return service;
    }


    //////////////////////////////////////////////

    async getAllServices(): Promise<any> {
        const services = await this.serviceRepository.findAll();
        return await Promise.all(services.map(async service => {
            return {
                ...service,
                imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
            }
        }));
    }

    async addServiceType(serviceType: ServiceType): Promise<any> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const findLastServiceType = await this.serviceTypeRepository.findLastServiceType();
            const newServiceType = await this.serviceTypeRepository.create({
                _id: findLastServiceType ? findLastServiceType._id + 1 : 1,
                name: serviceType.name,
                description: serviceType.description,
            }, session);
            await session.commitTransaction();
            return newServiceType;
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Add service type failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async addService(service: {
        description: string,
        serviceTypeId: number,
        name: string,
        duration: number,
        fee: number,
        imageBase64: string,
        steps: (ServiceStep & { imageBase64: string })[]
    }): Promise<any> {
        const session = await this.connection.startSession();
        session.startTransaction();
        var adding_serviceId: Types.ObjectId;
        try {
            const newService = await this.serviceRepository.create({
                description: service.description,
                serviceTypeId: service.serviceTypeId,
                name: service.name,
                duration: service.duration,
                fee: service.fee,
                isDeleted: false,
            }, session);
            adding_serviceId = newService._id;
            const folderPath = this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH') + `/${adding_serviceId}`;

            if (service.imageBase64) {
                await this.fileService.saveBase64File(service.imageBase64, folderPath, "main");
            } else {
                const sourcePath = this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH');
                const destinationPath = folderPath;
                const sourceFileName = 'unknown.jpg';
                const destinationFileName = 'main.jpg';
                await this.fileService.copyFile(sourcePath, sourceFileName, destinationPath, destinationFileName);
            }


            for (const step of service.steps) {
                await this.serviceStepRepository.create({
                    name: step.name,
                    stepOrder: step.stepOrder,
                    description: step.description,
                    serviceId: newService._id,
                }, session);

                if (step.imageBase64) {
                    await this.fileService.saveBase64File(step.imageBase64, folderPath, step.stepOrder.toString());
                } else {
                    const sourcePath = this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH');
                    const destinationPath = folderPath;
                    const sourceFileName = 'unknown.jpg';
                    const destinationFileName = step.stepOrder.toString() + '.jpg';
                    await this.fileService.copyFile(sourcePath, sourceFileName, destinationPath, destinationFileName);
                }

            }


            await session.commitTransaction();
            return newService;
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            await this.fileService.deleteFolder(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH') + `/${adding_serviceId}`);
            throw new HttpException('Add service failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async filterServices(skinTypes: number[], skinStatuses: number[], serviceTypeId: number): Promise<any> {

        try {
            const serviceSkinTypes = await this.serviceSkinTypeRepository.findBySkinTypeIds(skinTypes);
            const serviceSkinStatuses = await this.serviceSkinStatusRepository.findBySkinStatusIds(skinStatuses);
            console.log(serviceSkinTypes);
            console.log(serviceSkinStatuses);

            const serviceIds = serviceSkinTypes
                .map(serviceSkinType => serviceSkinType.serviceId)
                .filter(serviceId => serviceSkinStatuses
                    .map(serviceSkinStatus => serviceSkinStatus.serviceId)
                    .some(abc => abc.equals(serviceId)));

            const servicesIdsByServiceType = await Promise.all(serviceIds.map(async serviceId => {
                const service = await this.serviceRepository.findById(serviceId);
                return service.serviceTypeId === serviceTypeId ? service : null;
            }));
            return await Promise.all((servicesIdsByServiceType.filter(service => service !== null)).map(async service => {
                return {
                    ...service,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
                }
            }));
        } catch (error) {
            console.log(error);
            throw new HttpException('Filter services failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getServiceDetail(serviceId: Types.ObjectId): Promise<{
        service: Service & { imageUrl: string },
        steps: (ServiceStep & { imageUrl: string })[],
        skinTypes: SkinType[],
        skinStatuses: SkinStatus[],
        therapists: any[]
    }> {
        await this.getExistService(serviceId);
        try {
            const service = await this.serviceRepository.findById(serviceId);
            const steps = await this.serviceStepRepository.findByServiceId(new Types.ObjectId(serviceId));
            const serviceSkinTypes = await this.serviceSkinTypeRepository.findByServiceId(new Types.ObjectId(serviceId));
            const serviceSkinStatuses = await this.serviceSkinStatusRepository.findByServiceId(new Types.ObjectId(serviceId));
            const therapists = await Promise.all(( await this.therapistServiceRepository.findByServiceId(new Types.ObjectId(serviceId))).map( async therapistService => {
                const therapist = await this.accountRepository.findById(therapistService.accountId);
                return {
                    _id: therapist._id,
                    fullName: therapist.fullName,
                    email: therapist.email,
                    phoneNumber: therapist.phoneNumber,
                    experienceYears: therapistService.experienceYears,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), therapist._id, "main"),
                    isDeleted: therapist.isDeleted
                }
            }));
            return {
                service:{
                    ...service,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), serviceId, "main")
                },
                steps : await Promise.all(steps.map(async step => {
                    return {
                        ...step,
                        imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), serviceId, step.stepOrder.toString())
                    }
                })),
                skinTypes : await Promise.all(serviceSkinTypes.map(async skinType => {
                    return await this.skinTypeRepository.findById(skinType.skinId);
                })),
                skinStatuses: await Promise.all(serviceSkinStatuses.map(async skinStatus => {
                    return await this.skinStatusRepository.findById(skinStatus.statusId);
                })),
                therapists : therapists.filter(therapist => therapist.isDeleted === false)

            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Get service detail failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateService(serviceId: Types.ObjectId, service: {
        description: string,
        serviceTypeId: number,
        name: string,
        duration: number,
        fee: number,
        isDeleted: boolean,
        imageBase64: string,
        steps: (ServiceStep & { imageBase64: string })[]
    }): Promise<any> {

        await this.getExistService(new Types.ObjectId(serviceId));
        const session = await this.connection.startSession();
        session.startTransaction();
        var updating_serviceId: Types.ObjectId;
        try {
            const updatedService = await this.serviceRepository.update({
                _id: serviceId,
                description: service.description,
                serviceTypeId: service.serviceTypeId,
                name: service.name,
                duration: service.duration,
                fee: service.fee,
                isDeleted: service.isDeleted,
            }, session);

            updating_serviceId = updatedService._id;
            const folderPath = this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH') + `/${updating_serviceId}`;
            if (service.imageBase64) {
                await this.fileService.deleteFile(folderPath, "main");
                await this.fileService.saveBase64File(service.imageBase64, folderPath, "main");
            }

            const serviceSteps = await this.serviceStepRepository.findByServiceId(new Types.ObjectId(serviceId));
            for (const step of serviceSteps) {
                await this.fileService.deleteFile(folderPath, step.stepOrder.toString())
            }

            await this.serviceStepRepository.deleteByServiceId(new Types.ObjectId(serviceId), session);


            for (const step of service.steps) {
                await this.serviceStepRepository.create({
                    name: step.name,
                    stepOrder: step.stepOrder,
                    description: step.description,
                    serviceId: new Types.ObjectId(serviceId),
                }, session);

                if (step.imageBase64) {
                    await this.fileService.saveBase64File(step.imageBase64, folderPath, step.stepOrder.toString());
                } else {
                    const sourcePath = this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH');
                    const destinationPath = folderPath;
                    const sourceFileName = 'unknown.jpg';
                    const destinationFileName = step.stepOrder.toString() + '.jpg';
                    await this.fileService.copyFile(sourcePath, sourceFileName, destinationPath, destinationFileName);
                }

            }

            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Update service failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }

    }

    async deleteService(serviceId: Types.ObjectId): Promise<any> {
        await this.getExistService(serviceId);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.serviceRepository.delete(serviceId, session);
            await this.serviceStepRepository.deleteByServiceId(serviceId, session);

            await this.fileService.deleteFolder(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH') + `/${serviceId}`);

            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            session.abortTransaction();
            throw new HttpException('Delete service failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async deleteServiceType(serviceTypeId: number): Promise<any> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.serviceTypeRepository.delete(serviceTypeId, session);
            await this.serviceRepository.deleteByServiceTypeId(serviceTypeId, session);
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            session.abortTransaction();
            throw new HttpException('Delete service type failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }


}
