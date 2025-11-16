import { model, Schema, Types } from "mongoose";
const TaskSchema = new Schema({
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
export const Task = model("Task", TaskSchema);
//# sourceMappingURL=task.model.js.map