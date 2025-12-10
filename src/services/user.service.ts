import { User } from "../models/user.model.js";

type LoadUserDataType =
    | { ok: true, name: string }
    | { ok: false, message: "USER_NOT_FOUND" | "SERVER_ERROR" };

export async function loadUserData(userId: string): Promise<LoadUserDataType> {
    try {
        const user = await User.findById(userId).lean<{ name: string }>();
        if (!user) return { ok: false, message: "USER_NOT_FOUND" };

        return { ok: true, name: user.name };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}