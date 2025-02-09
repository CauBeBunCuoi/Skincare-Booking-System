import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, model, Model } from 'mongoose';
import 'reflect-metadata';
import { Account, AccountModel, AccountSchema } from './database/schemas/account/account.schema';
import { Role, RoleModel, RoleSchema } from './database/schemas/role/role.schema';
import { TherapistService, TherapistServiceModel, TherapistServiceSchema } from './database/schemas/therapistService/therapistService.schema';
import { TherapistBackground, TherapistBackgroundModel, TherapistBackgroundSchema } from './database/schemas/therapistBackground/therapistBackground.schema';
import { Service, ServiceModel, ServiceSchema } from './database/schemas/service/service.schema';
import { ServiceType, ServiceTypeModel, ServiceTypeSchema } from './database/schemas/serviceType/serviceType.schema';
import { SkinType, SkinTypeModel, SkinTypeSchema } from './database/schemas/skinType/skinType.schema';
import { SkinStatus, SkinStatusModel, SkinStatusSchema } from './database/schemas/skinStatus/skinStatus.schema';
import { ServiceSkinType, ServiceSkinTypeModel, ServiceSkinTypeSchema } from './database/schemas/serviceSkinType/serviceSkinType.schema';
import { ServiceSkinStatus, ServiceSkinStatusModel, ServiceSkinStatusSchema } from './database/schemas/serviceSkinStatus/serviceSkinStatus.schema';
import { RestSchedule, RestScheduleModel, RestScheduleSchema } from './database/schemas/restSchedule/restSchedule.schema';
import { WorkShift, WorkShiftModel, WorkShiftSchema } from './database/schemas/workShift/workShift.schema';
import { Booking, BookingModel, BookingSchema } from './database/schemas/booking/booking.schema';
import { BookingStatus, BookingStatusModel, BookingStatusSchema } from './database/schemas/bookingStatus/bookingStatus.schema';
import { ExecutionResult, ExecutionResultModel, ExecutionResultSchema } from './database/schemas/executionResult/executionResult.schema';
import { QuizQuestion, QuizQuestionModel, QuizQuestionSchema } from './database/schemas/quizQuestion/quizQuestion.schema';
import { QuizOption, QuizOptionModel, QuizOptionSchema } from './database/schemas/quizOption/quizOption.schema';
import { QuizOptionService, QuizOptionServiceModel, QuizOptionServiceSchema } from './database/schemas/quizOptionService/quizOptionService.schema';
import { Feedback, FeedbackModel, FeedbackSchema } from './database/schemas/feedback/feedback.schema';
import { ServiceStep, ServiceStepModel, ServiceStepSchema } from './database/schemas/serviceStep/serviceStep.schema';


type migrateSchemaType = [
  Model<any>,
  any
]

@Injectable()
export class AppMigration implements OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly connection: Connection,

    @InjectModel(Account.name) private readonly accountModel: AccountModel,
    @InjectModel(Role.name) private readonly roleModel: RoleModel,
    @InjectModel(TherapistService.name) private readonly therapistServiceModel: TherapistServiceModel,
    @InjectModel(TherapistBackground.name) private readonly therapistBackgroundModel: TherapistBackgroundModel,
    @InjectModel(Service.name) private readonly serviceModel: ServiceModel,
    @InjectModel(ServiceType.name) private readonly serviceTypeModel: ServiceTypeModel,   
    @InjectModel(ServiceStep.name) private readonly serviceStepModel: ServiceStepModel,
    @InjectModel(SkinType.name) private readonly skinTypeModel: SkinTypeModel,
    @InjectModel(SkinStatus.name) private readonly skinStatusModel: SkinStatusModel,
    @InjectModel(ServiceSkinType.name) private readonly serviceSkinTypeModel: ServiceSkinTypeModel,
    @InjectModel(ServiceSkinStatus.name) private readonly serviceSkinStatusModel: ServiceSkinStatusModel,
    @InjectModel(RestSchedule.name) private readonly restScheduleModel: RestScheduleModel,
    @InjectModel(WorkShift.name) private readonly workShiftModel: WorkShiftModel,
    @InjectModel(Booking.name) private readonly bookingModel: BookingModel,
    @InjectModel(BookingStatus.name) private readonly bookingStatusModel: BookingStatusModel,
    @InjectModel(ExecutionResult.name) private readonly executionResultModel: ExecutionResultModel,
    @InjectModel(QuizQuestion.name) private readonly quizQuestionModel: QuizQuestionModel,
    @InjectModel(QuizOption.name) private readonly quizOptionModel: QuizOptionModel,
    @InjectModel(QuizOptionService.name) private readonly quizOptionServiceModel: QuizOptionServiceModel,
    @InjectModel(Feedback.name) private readonly feedbackModel: FeedbackModel,  
  ) { }

  async onApplicationBootstrap() {
    console.log('---------------Running Migrations---------------');

    const migrateSchemas: migrateSchemaType[] = [
      [this.accountModel, AccountSchema.obj],
      [this.roleModel, RoleSchema.obj],
      [this.therapistServiceModel, TherapistServiceSchema.obj],
      [this.therapistBackgroundModel, TherapistBackgroundSchema.obj],
      [this.serviceModel, ServiceSchema.obj],
      [this.serviceTypeModel, ServiceTypeSchema.obj],
      [this.serviceStepModel, ServiceStepSchema.obj],
      [this.skinTypeModel, SkinTypeSchema.obj],
      [this.skinStatusModel, SkinStatusSchema.obj],
      [this.serviceSkinTypeModel, ServiceSkinTypeSchema.obj],
      [this.serviceSkinStatusModel, ServiceSkinStatusSchema.obj],
      [this.restScheduleModel, RestScheduleSchema.obj],
      [this.workShiftModel, WorkShiftSchema.obj],
      [this.bookingModel, BookingSchema.obj],
      [this.bookingStatusModel, BookingStatusSchema.obj],
      [this.executionResultModel, ExecutionResultSchema.obj],
      [this.quizQuestionModel, QuizQuestionSchema.obj],
      [this.quizOptionModel, QuizOptionSchema.obj],
      [this.quizOptionServiceModel, QuizOptionServiceSchema.obj],
      [this.feedbackModel, FeedbackSchema.obj],

      
    ]
    await this.execute_migration(migrateSchemas);

  }

  private async execute_migration(migrateSchemas: migrateSchemaType[]) {
    for (let i = 0; i < migrateSchemas.length; i++) {
      const [model, schema] = migrateSchemas[i];

      // xoá tất cả index của model
      await model.collection.dropIndexes();

      await this.ensureCollectionExisting(model);

      await this.ensureCollectionFields(model, schema);

      await this.ensureCollectionIndexes(model, schema);
    }
  }

  private async ensureCollectionExisting(model: Model<any>) {
    console.log(`\n[*] Ensuring existence for "${model.collection.name}" collection...`); 

    const existingCollections = await this.connection.db.listCollections().toArray();

    const collectionExists = existingCollections.some((col) => col.name === model.collection.name);
    if (!collectionExists) {
      console.log(`===> Creating "${model.collection.name}" collection...`);
      await model.createCollection();
    }
  }
  private async ensureCollectionFields(model: Model<any>, schema: any) {
    console.log(`\n[*] Ensuring feilds for "${model.collection.name}" collection...`);

    const expectedFields: any[] = this.getPropertyTypes(schema)
    const mongoDBDefaultFields = ['_id', 'createdAt', 'updatedAt', '__v'];


    const currentFieldArray = await model.db.db.collection(model.collection.name).find();

    for await (const currentFields of currentFieldArray) {
      if (currentFields) {
        const fieldsToAdd = {};
        const fieldsToRemove = {}

        const missingFields = expectedFields.filter((field) => !(field.property in currentFields) && !mongoDBDefaultFields.includes(field.property)); 


        const redundantFields = Object.keys(currentFields).filter((field) => !expectedFields.some((expectedField) => expectedField.property === field) && !mongoDBDefaultFields.includes(field));

        missingFields.forEach((field) => {
          fieldsToAdd[field.property] = null;  
        });

        redundantFields.forEach((field) => {
          fieldsToRemove[field] = '';
        });

        if (missingFields.length > 0) {
          console.log(`===> Creating fields: `, fieldsToAdd);



          await model.db.db.collection(model.collection.name).updateOne(
            { _id: currentFields._id },
            { $set: fieldsToAdd }
          );
        }
        if (redundantFields.length > 0) {
          console.log(`===> Removing fields: `, fieldsToRemove);
          await model.db.db.collection(model.collection.name).updateOne(
            { _id: currentFields._id },
            { $unset: fieldsToRemove }
          );
        }
      }
    }


  }
  private async ensureCollectionIndexes(model: Model<any>, schema: any) {
    console.log(`\n[*] Ensuring indexes for "${model.collection.name}" collection...`);
    try {
      model.syncIndexes();
    } catch (error) {
      console.error(`===> Error syncing indexes for ${schema.name}:`, error);
    }
  }



  getPropertyTypes(target: any): any[] {

    const propertyTypes = Object.keys(target)
      .filter((key) => key !== 'constructor')
      .map((key) => ({
        property: key,
        type: target[key].type.name,
      }));
    return propertyTypes;
  }


}
