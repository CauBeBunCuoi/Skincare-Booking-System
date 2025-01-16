import { Schema } from "inspector/promises";

export function apply_Virtuals(schema: any) {
    schema.virtual('age_toString').get(function (): string {
        return `${this.age} tuổi`;
    });
    schema.set('toJSON', {
        virtuals: true,
    });
}