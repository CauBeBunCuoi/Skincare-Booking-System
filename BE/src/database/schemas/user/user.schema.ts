import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './user.hooks';
import { apply_Methods } from './user.methods';
import { apply_Statics } from './user.statics';
import { apply_Virtuals } from './user.virtuals';
import { apply_Indexes } from './user.indexes';


// khai báo interface IUser_Statics để khai báo static method của Model [applyStatics(UserSchema)]
interface IUser_Statics {
  findByNameeeee: (name : string)=> Promise<UserDocument>  
}

// khai báo interface IUser_Methods để khai báo instance method của Document [applyMethods(UserSchema)]
interface IUser_Methods {
  get_Age_Nameeeee: () => string
}

// khai báo interface IUser_Virtauls để khai báo virtual props của Document [applyVirtuals(UserSchema)]
interface IUser_Virtauls {
  age_toString: string
}

export type UserDocument = User & Document & IUser_Methods & IUser_Virtauls;  // UserDocument sẽ phải kế thừa Class User, mongoose Document và IUser_Methods



@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, type: String, default: null })
  @IsString()
  name: string;

  @Prop({ type: Number, required: false, default: null })
  @IsNumber({}, { message: 'age must be a number' })  
  age: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null })
  @IsString()
  role_id: string;

  @Prop({ required: true, default: null })
  @IsNumber({}, { message: 'abc must be a number' })
  abc: number;

  @Prop({ required: false, default: null })
  @IsNumber({}, { message: 'xyz must be a number' })
  xyz: number;
}

// ** Index có tác dụng gì **
// Index giúp tăng tốc độ truy vấn = cách quy định là cách mà quá trình truy vấn được thực thi thông qua việc truy vấn dựa trên thứ tự index được quy định trong các field 
// thay vì quét toàn bộ các document trong collection, thì chỉ cần quét các document có field được index
// Index chỉ giúp tối ưu cấu trúc truy vấn chứ không xắp xếp lại thứ tự dữ liệu trong collection

//** schema.index sẽ tương đương với việc khai index trong @Prop() [nên sử dụng schema.index để quản lý index thay vì @Prop()] 
//** unique: true => field sẽ không cho phép trùng lặp giá trị

// ** Truy vấn áp dụng cơ chế index **
// 1. Truy vấn không sử dụng sort: cơ chế index sẽ được áp dụng nếu truy vấn CÓ* điều kiện truy vấn trên field được index 
// 2. Truy vấn sử dụng sort: cơ chế index sẽ được áp dụng nếu truy vấn có điều kiện truy vấn tuỳ thích và PHẢI* sort trên field được index
// [LƯU Ý]: trong trường hợp truy vấn có điệu kiện khớp với 1 HOẶC NHIỀU* index trong số các index đã quy định mà không sử dụng sort() thì mongo sẽ lựa chọn sử dụng index được cho là tối ưu nhất cho truy vấn 
// 3. Trong SQL thì không thể quy định 2 index trái ngược nhau như trong mongoDB, vd: price: 1, price: -1. Và SQL cũng không có phương thức tương tự với sort() trong mongoDB, nó sử dụng ORDER BY trong câu truy vấn SELECT


type UserModel = Model<UserDocument> & IUser_Statics; // UserModel sẽ phải kế thừa Model<UserDocument> và IUser_Statics
const UserSchema = SchemaFactory.createForClass(User);

// Apply hooks
apply_PreHooks(UserSchema);
apply_PostHooks(UserSchema);

// Apply methods
apply_Methods(UserSchema);

// Apply statics
apply_Statics(UserSchema);

// Apply virtuals
apply_Virtuals(UserSchema);

// Apply indexes
apply_Indexes(UserSchema);

export {UserSchema, UserModel}  