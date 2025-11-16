import { Document } from "mongoose";
interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
}
export declare const User: import("mongoose").Model<UserSchemaType, {}, {}, {}, Document<unknown, {}, UserSchemaType, {}, {}> & UserSchemaType & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=user.model.d.ts.map