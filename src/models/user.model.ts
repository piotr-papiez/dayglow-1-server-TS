import { model, Schema } from "mongoose";
import { Document } from "mongoose";

interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserSchemaType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.index({ email: 1 }, { unique: true });

export const User = model<UserSchemaType>("User", UserSchema);