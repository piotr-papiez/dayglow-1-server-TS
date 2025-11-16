import { Types } from "mongoose";
import type { Document } from "mongoose";
export interface TaskSchemaType extends Document {
    title: string;
    userId: Types.ObjectId;
    description?: string;
}
export declare const Task: import("mongoose").Model<TaskSchemaType, {}, {}, {}, Document<unknown, {}, TaskSchemaType, {}, {}> & TaskSchemaType & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=task.model.d.ts.map