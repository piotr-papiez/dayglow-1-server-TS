// Constants
import { REFRESH_TOKEN_TTL } from "../config/auth.config.js";

// Libraries
import crypto from "crypto";
import { signAccessToken, signRefreshToken } from "../lib/jwt.lib.js";
import { hashPassword, verifyPassword } from "../lib/password.lib.js";

// Models
import { RefreshToken } from "../models/refresh-token.model.js";
import { User } from "../models/user.model.js";

// Types
import type { LoginBodyType, RegisterBodyType, DeleteBodyType } from "../validators/auth.validator.js";

type CreateUserType =
    | { ok: true }
    | { ok: false, message: "ALREADY_EXISTS" | "SERVER_ERROR" };

type ValidateUserCredentialsType =
    | { ok: true, userId: string }
    | { ok: false, message: "USER_NOT_FOUND" | "SERVER_ERROR" | "INVALID_PASSWORD" };

type DeleteUserType =
    | { ok: true }
    | { ok: false, message: "INVALID_PASSWORD" | "USER_NOT_FOUND" | "SERVER_ERROR" };

export async function createUser(registerBody: RegisterBodyType): Promise<CreateUserType> {
    try {
        const encryptedPassword = await hashPassword(registerBody.password);

        await User.create({
            name: registerBody.name,
            email: registerBody.email,
            password: encryptedPassword
        });

        return { ok: true };
    } catch (error: any) {
        if (error?.code === 11000) return { ok: false, message: "ALREADY_EXISTS" };
        return { ok: false, message: "SERVER_ERROR" };
    }
}

export async function validateUserCredentials(loginBody: LoginBodyType): Promise<ValidateUserCredentialsType> {
    try {
        const userData = await User.findOne({ email: loginBody.email }).lean<{ _id: string, password: string }>();
        if (!userData) return { ok: false, message: "USER_NOT_FOUND" };

        const passwordValid = await verifyPassword(loginBody.password, userData.password);
        if (!passwordValid) return { ok: false, message: "INVALID_PASSWORD" };

        return { ok: true, userId: String(userData._id) };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}

export async function issueTokens(userId: string): Promise<{ accessToken: string, refreshToken: string }> {
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

export async function deleteUser(deleteBody: DeleteBodyType): Promise<DeleteUserType> {
    try {
        const userData = await User.findById(deleteBody.userId);
        if (!userData) return { ok: false, message: "USER_NOT_FOUND" };

        const passwordValid = await verifyPassword(deleteBody.password, userData.password);
        if (!passwordValid) return { ok: false, message: "INVALID_PASSWORD" };

        await userData.deleteOne();

        return { ok: true };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}