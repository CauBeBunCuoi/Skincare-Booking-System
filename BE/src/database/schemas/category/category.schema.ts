import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, model } from 'mongoose';
import { apply_PostHooks, apply_PreHooks } from './category.hooks';
import { apply_Methods } from './category.methods';
import { apply_Statics } from './category.statics';
import { apply_Virtuals } from './category.virtuals';
import { apply_Indexes } from './category.indexes';


interface ICategory_Statics {}

interface ICategory_Methods {}

interface ICategory_Virtauls {}

export type CategoryDocument = Category & Document & ICategory_Methods & ICategory_Virtauls; 

@Schema({ collection: 'categories', timestamps: true }) 
export class Category {
  @Prop({ required: true })
  name: string;


}
type CategoryModel = Model<CategoryDocument> & ICategory_Statics; 
const CategorySchema = SchemaFactory.createForClass(Category);

// Apply hooks
apply_PreHooks(CategorySchema);
apply_PostHooks(CategorySchema);

// Apply methods
apply_Methods(CategorySchema);

// Apply statics
apply_Statics(CategorySchema);

// Apply virtuals
apply_Virtuals(CategorySchema);

// Apply indexes
apply_Indexes(CategorySchema);


export {CategorySchema, CategoryModel}   