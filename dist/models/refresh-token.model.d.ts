import { Types } from "mongoose";
interface RefreshTokenSchemaType {
    jti: string;
    userId: Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
    revokedAt: Date;
    replacedBy: string;
}
export declare const RefreshToken: import("mongoose").Model<RefreshTokenSchemaType, {}, {}, {}, import("mongoose").Document<unknown, {}, RefreshTokenSchemaType, {}, {}> & RefreshTokenSchemaType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=refresh-token.model.d.ts.map