import { model, Schema, Types } from "mongoose";
import type { Document } from "mongoose";

export interface TaskSchemaType extends Document {
    title: string;
    userId: Types.ObjectId;
    description?: string;
}

const TaskSchema = new Schema<TaskSchemaType>({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: String
});

TaskSchema.index({ userId: 1, title: 1 }, { unique: true });

export const Task = model<TaskSchemaType>("Task", TaskSchema);