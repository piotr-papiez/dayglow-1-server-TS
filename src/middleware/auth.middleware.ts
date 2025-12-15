// Libraries
import { decodeAccessToken, decodeRefreshToken } from "../lib/jwt.lib.js";
import xss from "xss";

// Models
import { User } from "../models/user.model.js";

// Types
import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { RegisterBodyType, LoginBodyType, DeleteBodyType } from "../validators/auth.validator.js";

// Validators
import { loginValidator, registerValidator, deleteValidator } from "../validators/auth.validator.js";

export const validateRegisterBody: RequestHandler<{}, any, RegisterBodyType> = async (req, res, next) => {
    const validatedRequest = registerValidator.safeParse(req.body);
    if (!validatedRequest.success) return res.status(400).json({ error: "Validation error — invalid register data" });

    let { name, email, password } = validatedRequest.data;
    name = xss(name);

    res.locals.registerBody = { name, email, password };

    next();
}

export const validateLoginBody: RequestHandler<{}, any, LoginBodyType> = async (req, res, next) => {
    const validatedRequest = loginValidator.safeParse(req.body);
    if (!validatedRequest.success) return res.status(400).json({ ok: false, message: "USER_NOT_FOUND" });

    const { email, password } = validatedRequest.data;

    res.locals.loginBody = { email, password };

    return next();
};

export const validateDeleteBody: RequestHandler<{}, any, DeleteBodyType> = async (req, res, next) => {
    const userId = res.locals.userId as string;
    
    const validatedRequest = deleteValidator.safeParse({ userId, password: req.body.password });
    if (!validatedRequest.success) return res.status(400).json({ ok: false, message: "INVALID_PASSWORD" });

    res.locals.password = req.body.password;

    return next();
}

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    const userId = decodeRefreshToken(refreshToken);
    if (!userId) return res.status(401).json({ ok: false, message: "INVALID_OR_MISSING_REFRESHTOKEN" });

    try {
        const userData = await User.findById(userId)
        if (!userData) return res.status(404).json({ ok: false, message: "USER_NOT_FOUND" });

        res.locals.userId = userId;
        return next();
    } catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    const userId = decodeAccessToken(accessToken);

    if (!userId) return res.status(401).json({ ok: false, message: "TOKEN_EXPIRED" });

    res.locals.userId = userId;

    return next();
};

export const requireCookie = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.accessToken) return res.status(401).json({ ok: false, message: "SESSION_EXPIRED" });
    return next();
}