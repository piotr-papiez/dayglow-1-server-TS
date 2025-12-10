// Constants
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, CREATE_USER_STATUS_CODES, VALIDATE_USER_CREDENTIALS_STATUS_CODES, COOKIE_SETTINGS, DELETE_ACCOUNT_STATUS_CODES } from "../config/auth.config.js";
// Services
import { createUser, deleteUser, issueTokens, validateUserCredentials } from "../services/auth.service.js";
function setAuthCookies(res, tokens) {
    res.cookie("accessToken", tokens.accessToken, { ...COOKIE_SETTINGS, maxAge: ACCESS_TOKEN_TTL });
    res.cookie("refreshToken", tokens.refreshToken, { ...COOKIE_SETTINGS, maxAge: REFRESH_TOKEN_TTL });
}
function clearAuthCookies(res) {
    res.clearCookie("accessToken", { ...COOKIE_SETTINGS });
    res.clearCookie("refreshToken", { ...COOKIE_SETTINGS });
}
// POST: /api/auth/register
export const registerUser = async (req, res) => {
    const registerBody = res.locals.registerBody;
    try {
        const result = await createUser(registerBody);
        if (!result.ok)
            return res.status(CREATE_USER_STATUS_CODES[result.message]).json({ ...result });
        return res.status(201).json({ ...result });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// POST: /api/auth/login
export const loginUser = async (req, res) => {
    const loginBody = res.locals.loginBody;
    try {
        const result = await validateUserCredentials(loginBody);
        if (!result.ok)
            return res.status(VALIDATE_USER_CREDENTIALS_STATUS_CODES[result.message]).json({ ...result });
        const tokens = await issueTokens(result.userId);
        setAuthCookies(res, tokens);
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// POST: /api/auth/refresh
export const refreshTokens = async (req, res) => {
    const userId = res.locals.userId;
    try {
        const tokens = await issueTokens(userId);
        setAuthCookies(res, tokens);
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// POST: /api/auth/logout
export const logoutUser = async (req, res) => {
    try {
        clearAuthCookies(res);
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// DELETE: /api/auth/delete
export const deleteAccount = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const password = res.locals.password;
        const result = await deleteUser({ userId, password });
        if (!result.ok)
            return res.status(DELETE_ACCOUNT_STATUS_CODES[result.message]).json({ ...result });
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
//# sourceMappingURL=auth.controller.js.map