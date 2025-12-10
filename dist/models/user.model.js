import { model, Schema } from "mongoose";
import { Document } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
UserSchema.index({ email: 1 }, { unique: true });
export const User = model("User", UserSchema);
//# sourceMappingURL=user.model.js.map