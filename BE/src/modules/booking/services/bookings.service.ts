import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BookingRepository } from 'src/database/schemas/booking/booking.repository';
import { Booking, BookingModel } from 'src/database/schemas/booking/booking.schema';
import { BookingStatusRepository } from 'src/database/schemas/bookingStatus/bookingStatus.repository';
import { ExecutionResultRepository } from 'src/database/schemas/executionResult/executionResult.repository';
import { FeedbackRepository } from 'src/database/schemas/feedback/feedback.repository';
import { RestScheduleRepository } from 'src/database/schemas/restSchedule/restSchedule.repository';
import { ServiceRepository } from 'src/database/schemas/service/service.repository';
import { TherapistServiceRepository } from 'src/database/schemas/therapistService/therapistService.repository';
import { WorkShift, WorkShiftModel } from 'src/database/schemas/workShift/workShift.schema';
import { DateTime } from 'luxon';
import moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';
import { FileService } from 'src/common/services/file.service';
import { AccountRepository } from 'src/database/schemas/account/account.repository';
import { Account } from 'src/database/schemas/account/account.schema';

@Injectable()
export class BookingsService {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly bookingStatusRepository: BookingStatusRepository,
        private readonly feedbackRepository: FeedbackRepository,
        private readonly executionResultRepository: ExecutionResultRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly therapistServiceRepository: TherapistServiceRepository,
        private readonly restScheduleRepository: RestScheduleRepository,
        private readonly accountRepository: AccountRepository,

        @InjectModel(Booking.name) private bookingModel: BookingModel,
        @InjectModel(WorkShift.name) private workShiftModel: WorkShiftModel,

        private readonly configService: ConfigService,
        private readonly fileService: FileService,
    ) { }

    async getExistBookingById(bookingId: Types.ObjectId): Promise<any> {
        const booking = await this.bookingRepository.findById(bookingId);
        if (!booking) {
            throw new HttpException('Booking not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return booking;

    }

    // Hàm để lấy startTime và endTime thông qua duration và appointmentTime
    get_StartTimeAndEndTime_ByDuration(duration: number, appointmentTime: Date): any {
        const startTime = new Date(appointmentTime);
        const endTime = new Date(appointmentTime);
        endTime.setHours(endTime.getHours() + duration);
        return {
            startTime,
            endTime
        }
    }

    // Hàm để lấy giờ từ chuỗi thời gian "HH:MM:SS"
    get_TimeArray(timeString: string): { hours: number, minutes: number, seconds: number } {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return { hours, minutes, seconds };
    }

    // Hàm để thêm số 0 ở đầu nếu cần
    padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    get_TimeString_ByDate(date: Date): string {
        var hours = date.toISOString().split('T')[1].split(':')[0];
        var timeString = `${hours}:00:00`;

        return timeString;
    }

    get_HourStrings_InPeriod(startHour: string, endHour: string): string[] {
        const start = this.get_TimeArray(startHour);
        const end = this.get_TimeArray(endHour);
        console.log("start", start, startHour);
        console.log("end", end, endHour);
        const hours = []
        while (start.hours <= end.hours) {
            hours.push(`${this.padNumber(start.hours)}:${this.padNumber(start.minutes)}:${this.padNumber(start.seconds)}`);
            start.hours += 1;
        }
        return hours
    }

    async get_AllWorkHours(): Promise<{ workShiftId: number, workShiftHours: string[] }[]> {
        const workShifts = await this.workShiftModel.find().exec();
        const workShiftHours: {
            workShiftId: number,
            workShiftHours: string[]
        }[] = [];
        workShifts.forEach(workShift => {
            if (!workShiftHours.some(workShiftHour => workShiftHour.workShiftId === workShift._id)) {
                workShiftHours.push({ workShiftId: workShift._id, workShiftHours: [] });
            }

            const start = this.get_TimeArray(workShift.startHour);
            const end = this.get_TimeArray(workShift.endHour);

            while (start.hours <= end.hours) {
                const workShiftHour = workShiftHours.find(workShiftHour => workShiftHour.workShiftId === workShift._id);
                workShiftHour.workShiftHours.push(`${this.padNumber(start.hours)}:${this.padNumber(start.minutes)}:${this.padNumber(start.seconds)}`);
                start.hours += 1;
            }
        })
        return workShiftHours;
    }


    get_Next7DaySchedule_ByBookableHours(availableHours: { workShiftId: number, workShiftHours: string[] }[]): { date: string, hours: string[] }[] {
        const now = moment().tz("Asia/Ho_Chi_Minh");
        const next7Days: { date: string, hours: string[] }[] = [];
        for (let i = 1; i <= 7; i++) {
            const date = now.add(1, "day").format("YYYY-MM-DD");
            const hours = [];
            availableHours.forEach(availableHour => {
                hours.push(...availableHour.workShiftHours);
            })
            next7Days.push({
                date,
                hours
            })
        }
        return next7Days;
    }

    filter_Next7DaySchedule_ByTherapistFreeSchedules(
        next7DaySchedule: { date: string; hours: string[] }[],
        therapistFreeSchedules: { therapistId: Types.ObjectId; freeSchedules: { date: string; hours: string[] }[] }[]
    ) {
        return next7DaySchedule.map(schedule => {
            // Lọc lại danh sách giờ, chỉ giữ lại giờ có trong ít nhất một therapist
            const availableHours = schedule.hours.filter(hour => {
                return therapistFreeSchedules.some(free =>
                    free.freeSchedules.some(freeSchedule =>
                        freeSchedule.date === schedule.date && freeSchedule.hours.includes(hour)
                    )
                );
            });

            return { date: schedule.date, hours: availableHours };
        }).filter(schedule => schedule.hours.length > 0); // Xóa ngày không còn giờ nào
    }


    get_Next7DayTherapistFreeSchedules(
        therapistBusySchedules,
        next7DaySchedule,
        duration
    ): {
        therapistId: Types.ObjectId;
        freeSchedules: { date: string; hours: string[] }[],
    }[] {
        return therapistBusySchedules.map(({ therapistId, busySchedules }) => {
            let freeSchedules = next7DaySchedule.map(({ date, hours: busyhours }) => {
                let hours = busyhours.filter(
                    // hour => this.isScheduleAvailable(date, hour, busySchedules, duration)
                    hour => busySchedules.every(unavailable => {
                        if (unavailable.date === date) {
                            return !unavailable.hours.includes(hour) && !unavailable.hours.includes(`${this.padNumber(this.get_TimeArray(hour).hours + duration - 1)}:00:00`);
                        }
                        return true;
                    })
                );

                return { date, hours };
            });

            return { therapistId, freeSchedules };
        });
    }

    //////////////////////////////////////////////

    async getAllBooking(): Promise<any> {
        const bookings = await this.bookingRepository.findAll();
        return await Promise.all(bookings.map(async (booking): Promise<any> => {
            const bookingStatus = await this.bookingStatusRepository.findById(booking.bookStatusId);
            const feedback = await this.feedbackRepository.findByBookingId(booking._id);
            const executionResult = await this.executionResultRepository.findByBookingId(booking._id);
            const service = await this.serviceRepository.findById(booking.serviceId);
            //console.log("service", booking.serviceId);
            const result = {
                booking,
                service: {
                    ...service,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
                },
                bookingStatus,
                executionResult,
                feedback
            }
            return result;
        }))
    }

    async addBooking(booking: {
        serviceId: Types.ObjectId,
        appointmentTime: string,
        isAssigned: boolean,
        assignedTherapistId: Types.ObjectId,
    },
        user: any
    ): Promise<any> {
        try {
            const service = await this.serviceRepository.findById(booking.serviceId);
            const progress = this.get_StartTimeAndEndTime_ByDuration(service.duration, new Date(booking.appointmentTime));

            const addedBooking = await this.bookingRepository.create({
                accountId: new Types.ObjectId(user._id),
                serviceId: new Types.ObjectId(booking.serviceId),
                bookStatusId: 1,
                bookingDate: new Date(),
                appointmentTime: new Date(booking.appointmentTime),
                startTime: progress.startTime,
                endTime: progress.endTime,
                checkInTime: null,
                checkOutTime: null,
                isAssigned: booking.isAssigned,
                assignedTherapistId: booking.assignedTherapistId ? new Types.ObjectId(booking.assignedTherapistId) : null,
                extraFee: 0,
                totalFee: 0,
                hasPaid: false,
                cancelReason: null
            })
            return addedBooking;
        } catch (error) {
            console.log(error);
            throw new HttpException('Add booking failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBookingsByAccountId(accountId: Types.ObjectId): Promise<any> {
        const bookings = await this.bookingRepository.findByAccountId(new Types.ObjectId(accountId));
        return await Promise.all(bookings.map(async (booking): Promise<any> => {
            const bookingStatus = await this.bookingStatusRepository.findById(booking.bookStatusId);
            const feedback = await this.feedbackRepository.findByBookingId(booking._id);
            const executionResult = await this.executionResultRepository.findByBookingId(booking._id);
            const service = await this.serviceRepository.findById(booking.serviceId);

            const result = {
                booking,
                service: {
                    ...service,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
                },
                bookingStatus,
                executionResult,
                feedback
            }
            return result;
        }))
    }

    async getBookingDetail(bookingId: Types.ObjectId): Promise<any> {
        const booking = await this.getExistBookingById(bookingId);
        const bookingStatus = await this.bookingStatusRepository.findById(booking.bookStatusId);
        const feedback = await this.feedbackRepository.findByBookingId(booking._id);
        const executionResult = await this.executionResultRepository.findByBookingId(booking._id);
        const service = await this.serviceRepository.findById(booking.serviceId);

        return {
            booking,
            service: {
                ...service,
                imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main")
            },
            bookingStatus,
            executionResult,
            feedback
        }
    }


    async getAllSchedule(serviceId: Types.ObjectId): Promise<{
        schedules: { date: string, hours: string[] }[],
        therapistFreeSchedules: { therapistId: Types.ObjectId, freeSchedules: { date: string, hours: string[] }[] }[],
        availableTherapists: (Account & { imageUrl: string })[]
    }> {

        try {


            // lấy ra service
            const service = await this.serviceRepository.findById(serviceId);
            const serviceDuration = service.duration;

            // Lấy danh sách working hours
            const workHours = await this.get_AllWorkHours();

            // Lấy các therapist có trong TherapistService
            const therapists_available = await this.therapistServiceRepository.findByServiceId(serviceId);

            // Lấy các booking có appointmentTime > hôm nay, cancelReason = null, serviceId = serviceId, isAssigned = true
            const now = moment().tz("Asia/Ho_Chi_Minh");
            // console.log("now", now.format("YYYY-MM-DDT00:00:00[Z]"));
            // console.log("now", now.format("YYYY-MM-DDTHH:mm:ss[Z]"));

            // console.log("now now.add(1, day)", now.add(1, "day").format("YYYY-MM-DDT00:00:00[Z]"));
            // console.log("now now.add(1, day)", now.format("YYYY-MM-DDTHH:mm:ss[Z]"));
            const nextDate = now.add(1, "day").format("YYYY-MM-DDT00:00:00[Z]");
            const bookings_assigned = await this.bookingModel.find({
                appointmentTime: { $gte: new Date(nextDate) },
                cancelReason: null,
                serviceId: new Types.ObjectId(serviceId),
                isAssigned: true
            }).exec();

            // Lấy các therapist assigned
            const therapists_assigned = bookings_assigned.filter(booking => booking.assignedTherapistId);

            // Lấy các therapist unassigned
            const therapists_unassigned = therapists_available.filter(therapist => !therapists_assigned.some(assigned => assigned.assignedTherapistId.equals(therapist.accountId)));


            // lọc ra các therapist có schedule
            const therapistBusySchedules: {
                therapistId: Types.ObjectId,
                busySchedules: {
                    date: string,
                    hours: string[]
                }[]
            }[] = [];

            bookings_assigned.forEach(booking => {
                const therapistId = booking.assignedTherapistId;
                if (!therapistBusySchedules.some(unavailable => unavailable.therapistId.equals(therapistId))) {
                    therapistBusySchedules.push({
                        therapistId: therapistId,
                        busySchedules: []
                    })
                }
                const therapist = therapistBusySchedules.find(unavailable => unavailable.therapistId.equals(therapistId));
                const busySchedules = therapist.busySchedules;
                const date = booking.appointmentTime.toISOString().split('T')[0];
                let hours = this.get_HourStrings_InPeriod(
                    this.get_TimeString_ByDate(booking.startTime),
                    this.get_TimeString_ByDate(booking.endTime)
                );

                if (!busySchedules.some(busySchedule => busySchedule.date === date)) {
                    busySchedules.push({
                        date,
                        hours
                    })
                } else {
                    const busySchedule = busySchedules.find(busySchedule => busySchedule.date === date);
                    hours = hours.filter(hour => !busySchedule.hours.includes(hour));
                    busySchedule.hours = busySchedule.hours.concat(hours);
                }
            })

            // thêm vào / lọc các busy schedules của các therapist thông qua rest schedule
            await Promise.all(therapistBusySchedules.map(async therapist => {
                const restSchedules = await this.restScheduleRepository.findByTherapistId(therapist.therapistId);
                await Promise.all(restSchedules.map(async restSchedule => {
                    const date = restSchedule.restDate.toISOString().split('T')[0];
                    const workShift = await this.workShiftModel.findById(restSchedule.workShiftId).exec();
                    let hours = this.get_HourStrings_InPeriod(workShift.startHour, workShift.endHour);
                    if (!therapist.busySchedules.some(busySchedule => busySchedule.date === date)) {
                        therapist.busySchedules.push({
                            date,
                            hours
                        })
                    } else {
                        const busySchedule = therapist.busySchedules.find(busySchedule => busySchedule.date === date);
                        hours = hours.filter(hour => !busySchedule.hours.includes(hour));
                        busySchedule.hours = busySchedule.hours.concat(hours);

                    }
                }))

            }))

            // Lọc các available schedules của các therapist thông qua rest schedule
            await Promise.all(therapists_unassigned.map(async therapist => {
                if (!therapistBusySchedules.some(unavailable => unavailable.therapistId.equals(therapist.accountId))) {
                    therapistBusySchedules.push({
                        therapistId: therapist.accountId,
                        busySchedules: []
                    })
                }
                const restSchedules = await this.restScheduleRepository.findByTherapistId(therapist.accountId);

                await Promise.all(therapistBusySchedules.map(async therapist => {
                    const restSchedules = await this.restScheduleRepository.findByTherapistId(therapist.therapistId);
                    await Promise.all(restSchedules.map(async restSchedule => {
                        const date = restSchedule.restDate.toISOString().split('T')[0];
                        const workShift = await this.workShiftModel.findById(restSchedule.workShiftId).exec();

                        let hours = this.get_HourStrings_InPeriod(workShift.startHour, workShift.endHour);
                        if (!therapist.busySchedules.some(busySchedule => busySchedule.date === date)) {
                            therapist.busySchedules.push({
                                date,
                                hours
                            })
                        } else {
                            const busySchedule = therapist.busySchedules.find(busySchedule => busySchedule.date === date);
                            hours = hours.filter(hour => !busySchedule.hours.includes(hour));
                            busySchedule.hours = busySchedule.hours.concat(hours);
                        }
                    }))

                }))


            }))


            workHours.forEach(workHour => {
                //workHour.workShiftHours = this.getAvailableSlots(workHour.workShiftHours, serviceDuration);
                workHour.workShiftHours = workHour.workShiftHours.filter((time, index) => {
                    const endIndex = index + serviceDuration;
                    return endIndex < workHour.workShiftHours.length;
                });
            })
            //console.log(workHours)
            var next7DaySchedule = this.get_Next7DaySchedule_ByBookableHours(workHours);
            //console.log(next7DaySchedule)

            // therapistBusySchedules.forEach(therapist => {
            //     console.log("therapistId", therapist.therapistId);
            //     therapist.busySchedules.forEach(busySchedule => {
            //         console.log("busySchedule", busySchedule.date, busySchedule.hours);
            //     })
            // })
            // console.log("----------------------------------------------------------------------------------");
            const therapistFreeSchedules = this.get_Next7DayTherapistFreeSchedules(therapistBusySchedules, next7DaySchedule, serviceDuration);
            therapistFreeSchedules.forEach(therapist => {
                console.log("therapistId", therapist.therapistId);
                therapist.freeSchedules.forEach(freeSchedule => {
                    console.log("freeSlot", freeSchedule.date, freeSchedule.hours);
                })
            })

            const availableTherapists = await Promise.all(therapistFreeSchedules.filter(therapist => therapist.freeSchedules.length > 0).map(async therapist => {
                const account = await this.accountRepository.findById(therapist.therapistId);
                return {
                    ...account,
                    imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.ACCOUNT_IMAGE_PATH'), account._id, "main")
                }
            }));
            return {
                schedules: this.filter_Next7DaySchedule_ByTherapistFreeSchedules(next7DaySchedule, therapistFreeSchedules),
                therapistFreeSchedules,
                availableTherapists
            }

        } catch (error) {
            console.log(error);
            throw new HttpException('Get schedule failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getScheduleByTherapistId(serviceId: Types.ObjectId, therapistId: Types.ObjectId,): Promise<any> {
        try {
            const therapistFreeSchedules = (await this.getAllSchedule(serviceId)).therapistFreeSchedules;
            const therapistFreeSchedule = therapistFreeSchedules.find(therapist => therapist.therapistId.equals(therapistId));
            return therapistFreeSchedule.freeSchedules;

        } catch (error) {
            console.log(error);
            throw new HttpException('Get schedule failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async cancelBooking(bookingId: Types.ObjectId, reason: string): Promise<any> {
        await this.getExistBookingById(bookingId);
        try {
            await this.bookingRepository.cancelBooking(bookingId, reason);
        } catch (error) {
            console.log(error);
            throw new HttpException('Cancel booking failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkInBooking(bookingId: Types.ObjectId): Promise<any> {
        await this.getExistBookingById(bookingId);
        try {
            await this.bookingRepository.checkInBooking(bookingId);
        } catch (error) {
            console.log(error);
            throw new HttpException('Check-in booking failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkOutBooking(bookingId: Types.ObjectId): Promise<any> {
        await this.getExistBookingById(bookingId);
        try {
            await this.bookingRepository.checkOutBooking(bookingId);
        } catch (error) {
            console.log(error);
            throw new HttpException('Check-out booking failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addFeedback(bookingId: Types.ObjectId, feedback: { feedbackContent: string, rate: number }): Promise<any> {
        await this.getExistBookingById(bookingId);
        try {
            await this.feedbackRepository.create({
                bookingId: new Types.ObjectId(bookingId),
                feedbackContent: feedback.feedbackContent,
                rate: feedback.rate
            })
        } catch (error) {
            console.log(error);
            throw new HttpException('Add feedback failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async assignTherapist(bookingId: Types.ObjectId, therapistId: Types.ObjectId): Promise<any> {
        await this.getExistBookingById(bookingId);
        try {
            await this.bookingRepository.assignTherapist(bookingId, therapistId);
        } catch (error) {
            console.log(error);
            throw new HttpException('Assign therapist failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
