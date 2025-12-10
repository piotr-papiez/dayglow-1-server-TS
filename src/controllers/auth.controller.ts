// Constants
import {
    ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, CREATE_USER_STATUS_CODES,
    VALIDATE_USER_CREDENTIALS_STATUS_CODES, COOKIE_SETTINGS, DELETE_ACCOUNT_STATUS_CODES
} from "../config/auth.config.js";

// Services
import { createUser, deleteUser, issueTokens, validateUserCredentials } from "../services/auth.service.js";

// Types
import type { Request, Response } from "express";
import type { RegisterBodyType, LoginBodyType } from "../validators/auth.validator.js";

type TokensType = { accessToken: string, refreshToken: string };

function setAuthCookies(res: Response, tokens: TokensType): void {
    res.cookie("accessToken", tokens.accessToken, { ...COOKIE_SETTINGS, maxAge: ACCESS_TOKEN_TTL });
    res.cookie("refreshToken", tokens.refreshToken, { ...COOKIE_SETTINGS, maxAge: REFRESH_TOKEN_TTL });
}

function clearAuthCookies(res: Response): void {
    res.clearCookie("accessToken", { ...COOKIE_SETTINGS });
    res.clearCookie("refreshToken", { ...COOKIE_SETTINGS });
}

// POST: /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
    const registerBody = res.locals.registerBody as RegisterBodyType;

    try {
        const result = await createUser(registerBody);
        if (!result.ok) return res.status(CREATE_USER_STATUS_CODES[result.message]).json({ ...result });

        return res.status(201).json({ ...result });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};

// POST: /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
    const loginBody = res.locals.loginBody as LoginBodyType;

    try {
        const result = await validateUserCredentials(loginBody);
        if (!result.ok) return res.status(VALIDATE_USER_CREDENTIALS_STATUS_CODES[result.message]).json({ ...result });

        const tokens = await issueTokens(result.userId);

        setAuthCookies(res, tokens);

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};

// POST: /api/auth/refresh
export const refreshTokens = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;

    try {
        const tokens = await issueTokens(userId);

        setAuthCookies(res, tokens);

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};

// POST: /api/auth/logout
export const logoutUser = async (req: Request, res: Response) => {
    try {
        clearAuthCookies(res);
        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
}

// DELETE: /api/auth/delete
export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId as string;
        const password = res.locals.password as string;

        const result = await deleteUser({ userId, password });
        if (!result.ok) return res.status(DELETE_ACCOUNT_STATUS_CODES[result.message]).json({ ...result });

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
}