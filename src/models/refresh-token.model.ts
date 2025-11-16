import { model, Schema, Types } from "mongoose";

interface RefreshTokenSchemaType {
    jti: string;
    userId: Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
    revokedAt: Date;
    replacedBy: string;
}

const RefreshTokenSchema = new Schema<RefreshTokenSchemaType>({
    jti: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    revokedAt: Date,
    replacedBy: String
});

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = model<RefreshTokenSchemaType>("RefreshToken", RefreshTokenSchema);