import { HttpException, HttpStatus, Injectable, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FileService } from 'src/common/services/file.service';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { BookingRepository } from 'src/database/schemas/booking/booking.repository';
import { FeedbackRepository } from 'src/database/schemas/feedback/feedback.repository';
import { RestScheduleRepository } from 'src/database/schemas/restSchedule/restSchedule.repository';
import { RoleRepository } from 'src/database/schemas/role/role.repository';
import { Service, ServiceModel } from 'src/database/schemas/service/service.schema';
import { TherapistBackgroundRepository } from 'src/database/schemas/therapistBackground/therapistBackground.repository';
import { TherapistServiceRepository } from 'src/database/schemas/therapistService/therapistService.repository';
import { TherapistService } from 'src/database/schemas/therapistService/therapistService.schema';
import { WorkShiftRepository } from 'src/database/schemas/workShift/workShift.repository';

@Injectable()
export class TherapistAccountsService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly roleRepository: RoleRepository,
        private readonly therapistBackgroundRepository: TherapistBackgroundRepository,
        private readonly therapistServiceRepository: TherapistServiceRepository,
        private readonly restScheduleRepository: RestScheduleRepository,
        private readonly workShiftRepository: WorkShiftRepository,
        private readonly bookingRepository: BookingRepository,
        private readonly feedbackRepository: FeedbackRepository,

        @InjectModel(Service.name) private serviceModel: ServiceModel,

        private readonly configService: ConfigService,
        private readonly fileService: FileService,
    ) { }

    async getValidatedTherapistById(therapistId: Types.ObjectId): Promise<any> {
        try {
            const therapist = await this.accountRepository.findById(therapistId);
            if (!therapist || therapist.isDeleted || therapist.roleId !== 3) {
                throw new HttpException('Therapist not found', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return therapist;
        } catch (error) {
            console.log(error);
            throw new HttpException('Therapist not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    average_calculate(list: number[]): number {
        if (list.length === 0) return 0; 
        const sum = list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / list.length;
    }


    //////////////////////////////////////////////


    async getTherapistDetails(therapistId: Types.ObjectId): Promise<any> {
        const therapist = await this.getValidatedTherapistById(therapistId);
        // services
        const therapist_services = await this.therapistServiceRepository.findByTherapistId(therapistId);
        const services = await this.serviceModel.find({ _id: { $in: therapist_services.map(therapist_service => therapist_service.serviceId) }, isDeleted: false }).lean().exec();

        // backgrounds
        const backgrounds = await this.therapistBackgroundRepository.findByTherapistId(therapistId);

        // restSchedules
        const restSchedules = await this.restScheduleRepository.findByTherapistId(therapistId)

        // feedbackRates
        const booking_assigned = await this.bookingRepository.findByAssignedTherapistId(therapistId);
        const feedbackRates = await this.feedbackRepository.findByBookingIdList(booking_assigned.map(booking => booking._id));

        // analyzing
        const analyzing = {
            avgRate: this.average_calculate(feedbackRates.map(feedbackRate => feedbackRate.rate)),
        }
        return {
            therapist: {
                ...therapist,
                imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), therapist._id, "main")
            },
            services: await Promise.all(services.map(async service => {
                const therapist_service = therapist_services.find(therapist_service => therapist_service.serviceId.equals(service._id));
                return {
                    ...service,
                    experienceYears: therapist_service.experienceYears,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
                }
            })),
            backgrounds,
            restSchedules,
            feedbackRates: await Promise.all(feedbackRates.map(async feedbackRate => {
                const booking = await this.bookingRepository.findById(feedbackRate.bookingId);
                const account = await this.accountRepository.findById(booking.accountId);
                return {
                    ...feedbackRate,
                    account: {
                        ...account,
                        imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), account._id, "main")
                    }
                }
            })),
            analyzing
        }
    }

    async getTherapistSelection(therapistId: Types.ObjectId): Promise<any> {
        const therapist = await this.getValidatedTherapistById(therapistId);
        // backgrounds
        const backgrounds = await this.therapistBackgroundRepository.findByTherapistId(therapistId);

        // feedbackRates 
        const booking_assigned = await this.bookingRepository.findByAssignedTherapistId(therapistId);
        const feedbackRates = await this.feedbackRepository.findByBookingIdList(booking_assigned.map(booking => booking._id));

        // analyzing
        const analyzing = {
            avgRate: this.average_calculate(feedbackRates.map(feedbackRate => feedbackRate.rate)),
        }

        return {
            therapist: {
                ...therapist,
                imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), therapist._id, "main")
            },
            backgrounds,
            feedbackRates: await Promise.all(feedbackRates.map(async feedbackRate => {
                const booking = await this.bookingRepository.findById(feedbackRate.bookingId);
                const account = await this.accountRepository.findById(booking.accountId);
                return {
                    ...feedbackRate,
                    account: {
                        ...account,
                        imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), account._id, "main")
                    }
                }
            })),
            analyzing
        }
    }

    async addTherapistServices(therapistId: Types.ObjectId, therapistServices: { serviceId: Types.ObjectId, experienceYears: number }[]): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        const therapistServicesExist = await this.therapistServiceRepository.findByTherapistId(therapistId);
        const serviceIds = therapistServices.map(therapistService => new Types.ObjectId(therapistService.serviceId));
        const duplicatedServiceIds = therapistServicesExist.filter(therapistService => serviceIds.some(serviceId => serviceId.equals(therapistService.serviceId)));

        if (duplicatedServiceIds.length > 0) {
            throw new HttpException('Duplicated service ids', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {


            const addedTherapistServices = await this.therapistServiceRepository.createMany(therapistServices.map(therapistService => ({ accountId: new Types.ObjectId(therapistId), serviceId: new Types.ObjectId(therapistService.serviceId), experienceYears: therapistService.experienceYears })));
            //const addedTherapistServices = await this.therapistServiceRepository.createMany(therapistServices.map(therapistService => ({ accountId: therapistId, serviceId: therapistService.serviceId, experienceYears: therapistService.experienceYears })));
            return addedTherapistServices;
        } catch (error) {
            console.log(error);
            throw new HttpException('Add therapist services failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTherapistService(therapistId: Types.ObjectId, serviceId: Types.ObjectId): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        try {
            const deletedTherapistService = await this.therapistServiceRepository.deleteByTherapistIdAndServiceId(therapistId, serviceId);
            return deletedTherapistService;
        } catch (error) {
            throw new HttpException('Delete therapist service failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addTherapistBackgrounds(therapistId: Types.ObjectId, therapistBackgrounds: { description: string }[]): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        try {
            const addedTherapistBackgrounds = await this.therapistBackgroundRepository.createMany(therapistBackgrounds.map(therapistBackground => ({ accountId: new Types.ObjectId(therapistId), description: therapistBackground.description })));
            return addedTherapistBackgrounds;
        } catch (error) {
            console.log(error);
            throw new HttpException('Add therapist backgrounds failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTherapistBackground(therapistId: Types.ObjectId, backgroundId: Types.ObjectId): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        try {
            const deletedTherapistBackground = await this.therapistBackgroundRepository.delete(backgroundId);
            return deletedTherapistBackground;
        } catch (error) {
            console.log(error);
            throw new HttpException('Delete therapist background failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addRestSchedule(therapistId: Types.ObjectId, restSchedules: { restDate: string, workShiftId: number }): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        const existSchedule = await this.restScheduleRepository.findByTherapistIdAndRestDateAndWorkShiftId(therapistId, new Date(restSchedules.restDate), restSchedules.workShiftId);
        if (existSchedule) {
            throw new HttpException('Rest schedule already exists', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const addedRestSchedules = await this.restScheduleRepository.create({ accountId: new Types.ObjectId(therapistId), restDate: new Date(restSchedules.restDate), workShiftId: restSchedules.workShiftId });
            return addedRestSchedules;
        } catch (error) {
            console.log(error);
            throw new HttpException('Add rest schedules failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRestSchedule(therapistId: Types.ObjectId, restScheduleId: Types.ObjectId): Promise<any> {
        await this.getValidatedTherapistById(therapistId);
        const existSchedule = await this.restScheduleRepository.findById(restScheduleId);
        if (!existSchedule) {
            throw new HttpException('Rest schedule not exists', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const deletedRestSchedule = await this.restScheduleRepository.delete(restScheduleId);
            return deletedRestSchedule;
        } catch (error) {
            console.log(error);
            throw new HttpException('Delete rest schedule failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
