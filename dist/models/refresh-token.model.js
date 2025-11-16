import { model, Schema, Types } from "mongoose";
const RefreshTokenSchema = new Schema({
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
export const RefreshToken = model("RefreshToken", RefreshTokenSchema);
//# sourceMappingURL=refresh-token.model.js.map