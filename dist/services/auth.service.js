// Constants
import { REFRESH_TOKEN_TTL } from "../config/auth.config.js";
// Libraries
import crypto from "crypto";
import { signAccessToken, signRefreshToken } from "../lib/jwt.lib.js";
import { hashPassword, verifyPassword } from "../lib/password.lib.js";
// Models
import { RefreshToken } from "../models/refresh-token.model.js";
import { User } from "../models/user.model.js";
export async function createUser(registerBody) {
    try {
        const encryptedPassword = await hashPassword(registerBody.password);
        await User.create({
            name: registerBody.name,
            email: registerBody.email,
            password: encryptedPassword
        });
        return { ok: true };
    }
    catch (error) {
        if (error?.code === 11000)
            return { ok: false, message: "ALREADY_EXISTS" };
        return { ok: false, message: "SERVER_ERROR" };
    }
}
export async function validateUserCredentials(loginBody) {
    try {
        const userData = await User.findOne({ email: loginBody.email }).lean();
        if (!userData)
            return { ok: false, message: "USER_NOT_FOUND" };
        const passwordValid = await verifyPassword(loginBody.password, userData.password);
        if (!passwordValid)
            return { ok: false, message: "INVALID_PASSWORD" };
        return { ok: true, userId: String(userData._id) };
    }
    catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}
export async function issueTokens(userId) {
    const jti = crypto.randomUUID();
    const accessToken = signAccessToken({ userId });
    const refreshToken = signRefreshToken({ userId });
    await RefreshToken.create({
        jti,
        userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
    });
    return { accessToken, refreshToken };
}
//# sourceMappingURL=auth.service.js.map