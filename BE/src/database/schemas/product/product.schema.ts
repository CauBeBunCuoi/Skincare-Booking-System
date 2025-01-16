import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, model } from 'mongoose';
import { apply_PreHooks } from './product.hooks';
import { apply_Methods } from './product.methods';
import { apply_Statics } from './product.statics';
import { apply_Virtuals } from './product.virtuals';
import { apply_Indexes } from './product.indexes';

interface IProduct_Statics {}

interface IProduct_Methods {}

interface IProduct_Virtauls {}

export type ProductDocument = Product & Document & IProduct_Methods & IProduct_Virtauls;

@Schema({ collection: 'products', timestamps: true }) 
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  sku: string; 

  @Prop({ required: true, index: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: true })
  isActive: boolean;
}

type ProductModel = Model<ProductDocument> & IProduct_Statics;
const ProductSchema = SchemaFactory.createForClass(Product);

// Apply hooks
apply_PreHooks(ProductSchema);

// Apply methods
apply_Methods(ProductSchema);

// Apply statics
apply_Statics(ProductSchema);

// Apply virtuals
apply_Virtuals(ProductSchema);

// Apply indexes
apply_Indexes(ProductSchema);

export {ProductSchema, ProductModel}  