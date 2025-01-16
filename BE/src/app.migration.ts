import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, model, Model } from 'mongoose';
import 'reflect-metadata';
import { Product, ProductModel, ProductSchema } from './database/schemas/product/product.schema';
import { User, UserModel, UserSchema } from './database/schemas/user/user.schema';
import { Role, RoleModel, RoleSchema } from './database/schemas/role/role.schema';
import { Category, CategoryModel, CategorySchema } from './database/schemas/category/category.schema';


type migrateSchemaType = [
  Model<any>,
  any
]

@Injectable()
export class AppMigration implements OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly connection: Connection,

    @InjectModel(Category.name) private readonly categoryModel: CategoryModel,
    @InjectModel(Product.name) private readonly productModel: ProductModel,
    @InjectModel(User.name) private readonly userModel: UserModel,
    @InjectModel(Role.name) private readonly roleModel: RoleModel,


  ) { }

  async onApplicationBootstrap() {
    console.log('---------------Running Migrations---------------');
    // await this.ensureProductSchema();

    // Ensure schema for other collections

    //await this.ensureSchema(this.userModel, this.userModel.collection.name, UserSchema.obj);

    const migrateSchemas: migrateSchemaType[] = [
      [this.categoryModel, CategorySchema.obj],
      [this.productModel, ProductSchema.obj],
      [this.userModel, UserSchema.obj],
      [this.roleModel, RoleSchema.obj],
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

    // const expectedFields: any[] = [...this.getPropertyTypes(schema), { property: '_id', type: 'ObjectId' }];
    const expectedFields: any[] = this.getPropertyTypes(schema)
    const mongoDBDefaultFields = ['_id', 'createdAt', 'updatedAt', '__v'];

    // console.log('expectedFields', expectedFields);

    //const currentFields = await model.db.db.collection(model.collection.name).findOne();
    const currentFieldArray = await model.db.db.collection(model.collection.name).find();
    // const docArray = await currentFieldArray.toArray();

    for await (const currentFields of currentFieldArray) {
      // console.log('currentFields', currentFields);
      if (currentFields) {
        const fieldsToAdd = {};
        const fieldsToRemove = {}

        // const missingFields = expectedFields.filter((field) => !currentFields[field.property] && !mongoDBDefaultFields.includes(field.property));
        const missingFields = expectedFields.filter((field) => !(field.property in currentFields) && !mongoDBDefaultFields.includes(field.property)); 
        // console.log('missingFields', missingFields);


        const redundantFields = Object.keys(currentFields).filter((field) => !expectedFields.some((expectedField) => expectedField.property === field) && !mongoDBDefaultFields.includes(field));
        // console.log('redundantFields', redundantFields);

        missingFields.forEach((field) => {
          fieldsToAdd[field.property] = null;  // MongoDb không ràng buộc kiểu dữ liệu, nên để null, sau này có thể thêm kiểu dữ liệu khác vào (MongoDb sẽ ép kiểu dữ liệu tự động)
        });

        // Duyệt qua các trường thừa và xóa chúng
        redundantFields.forEach((field) => {
          fieldsToRemove[field] = '';
        });

        if (missingFields.length > 0) {
          console.log(`===> Creating fields: `, fieldsToAdd);


          // await model.db.db.collection(model.collection.name).updateMany(
          //   {},
          //   { $set: fieldsToAdd }

          // );
          await model.db.db.collection(model.collection.name).updateOne(
            { _id: currentFields._id },
            { $set: fieldsToAdd }
          );
        }
        if (redundantFields.length > 0) {
          console.log(`===> Removing fields: `, fieldsToRemove);
          // await model.db.db.collection(model.collection.name).updateMany(
          //   {},
          //   { $unset: fieldsToRemove }
          // );
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
      // console.log(`Indexes synced for: ${schema.name}`);
    } catch (error) {
      console.error(`===> Error syncing indexes for ${schema.name}:`, error);
    }
  }



  getPropertyTypes(target: any): any[] {
    // console.log('target', target['age'].type.name);

    const propertyTypes = Object.keys(target)
      .filter((key) => key !== 'constructor')
      .map((key) => ({
        property: key,
        // type: Reflect.getMetadata('design:type', target, key)?.name,
        type: target[key].type.name,
      }));
    // console.log('getPropertyTypes', propertyTypes);
    return propertyTypes;
  }

  private async ensureSchema(model: Model<any>, collectionName: string, schema: any) {
    // Ensure collection exists
    const existingCollections = await this.connection.db.listCollections().toArray();

    const collectionExists = existingCollections.some((col) => col.name === collectionName);
    if (!collectionExists) {
      console.log(`Creating "${collectionName}" collection...`);
      await model.createCollection();
    } else {
      console.log(`"${collectionName}" collection already exists.`);
    }

    // Ensure required fields

    // const expectedFields: any[] = [...this.getPropertyTypes(schema), 
    //   { property: '_id', type: 'ObjectId' },
    //   // các trường của mongoDB mặc định, có sẵn hoặc chưa phát sinh
    //   { property: 'createdAt', type: 'Date' },
    //   { property: 'updatedAt', type: 'Date' },
    //   { property: '__v', type: 'Number' },

    // ];
    const expectedFields: any[] = this.getPropertyTypes(schema);
    const mongoDBDefaultFields = ['_id', 'createdAt', 'updatedAt', '__v'];
    console.log('expectedFields', expectedFields);

    const currentFields = await model.db.db.collection(collectionName).findOne();
    console.log('currentFields', currentFields);

    if (currentFields) {
      const fieldsToAdd = {};
      const fieldsToRemove = {}

      // const missingFields = expectedFields.filter((field) => !currentFields[field.property] && !mongoDBDefaultFields.includes(field.property));
      console.log('expectedFields', expectedFields);
      console.log('currentFields',currentFields)
      const missingFields = expectedFields.filter((field) => !(field.property in currentFields) && !mongoDBDefaultFields.includes(field.property));
      console.log('missingFields', missingFields);

      const redundantFields = Object.keys(currentFields).filter((field) => !expectedFields.some((expectedField) => expectedField.property === field && !mongoDBDefaultFields.includes(field)));
      console.log('redundantFields', redundantFields);

      missingFields.forEach((field) => {
        fieldsToAdd[field.property] = null;  // MongoDb không ràng buộc kiểu dữ liệu, nên để null, sau này có thể thêm kiểu dữ liệu khác vào (MongoDb sẽ ép kiểu dữ liệu tự động)
      });

      // Duyệt qua các trường thừa và xóa chúng
      redundantFields.forEach((field) => {
        fieldsToRemove[field] = '';
      });

      if (missingFields.length > 0) {
        console.log(`Creating fields for "${collectionName}" collection...`);


        await model.db.db.collection(collectionName).updateMany(
          {},
          { $set: fieldsToAdd }

        );
      }
      if (redundantFields.length > 0) {
        console.log(`Removing fields for "${collectionName}" collection...`);
        await model.db.db.collection(collectionName).updateMany(
          {},
          { $unset: fieldsToRemove }
        );
      }
    }
    try {
      model.syncIndexes();
      console.log(`Indexes synced for: ${schema.name}`);
    } catch (error) {
      console.error(`Error syncing indexes for ${schema.name}:`, error);
    }
  }

  private async ensureProductSchema() {
    // Check if the collection exists
    const existingCollections = await this.productModel.db.db.listCollections().toArray();

    const productCollectionExists = existingCollections.some(
      (col) => col.name === 'products',
    );

    if (!productCollectionExists) {
      console.log('Creating "products" collection...');
      await this.productModel.createCollection();
    } else {
      console.log('"products" collection already exists.');
    }

    if (existingCollections.some((col) => col.name === 'users')) {
      console.log('Creating "users" collection...');
      await this.userModel.createCollection();
    }
    if (existingCollections.some((col) => col.name === 'roles')) {
      console.log('Creating "roles" collection...');
      await this.roleModel.createCollection
    }

  }
}
