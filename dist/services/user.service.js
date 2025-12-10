import { User } from "../models/user.model.js";
export async function loadUserData(userId) {
    try {
        const user = await User.findById(userId).lean();
        if (!user)
            return { ok: false, message: "USER_NOT_FOUND" };
        return { ok: true, name: user.name };
    }
    catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}
//# sourceMappingURL=user.service.js.map