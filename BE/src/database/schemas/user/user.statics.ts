import { UserDocument } from "./user.schema";

export function apply_Statics(schema: any) {
    schema.statics.findByNameeeee = function (name: string) : Promise<UserDocument> {
        return this.findOne({ name });
    };
}