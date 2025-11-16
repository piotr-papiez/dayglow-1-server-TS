// Constants
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, CREATE_USER_STATUS_CODES, VALIDATE_USER_CREDENTIALS_STATUS_CODES, COOKIE_SETTINGS } from "../config/auth.config.js";
// Services
import { createUser, issueTokens, validateUserCredentials } from "../services/auth.service.js";
function setAuthCookies(res, tokens) {
    res.cookie("accessToken", tokens.accessToken, { ...COOKIE_SETTINGS, maxAge: ACCESS_TOKEN_TTL });
    res.cookie("refreshToken", tokens.refreshToken, { ...COOKIE_SETTINGS, maxAge: REFRESH_TOKEN_TTL });
}
// POST: /api/auth/register
export const registerUser = async (req, res) => {
    const registerBody = res.locals.registerBody;
    try {
        const result = await createUser(registerBody);
        if (!result.ok)
            return res.status(CREATE_USER_STATUS_CODES[result.message]).json({ error: result.message });
        return res.status(201).json({ message: "User successfully registered" });
    }
    catch (error) {
        return res.status(500).json({ error: "Server error while registering user" });
    }
};
// POST: /api/auth/login
export const loginUser = async (req, res) => {
    const loginBody = res.locals.loginBody;
    try {
        const result = await validateUserCredentials(loginBody);
        if (!result.ok)
            return res.status(VALIDATE_USER_CREDENTIALS_STATUS_CODES[result.message]).json({ error: result.message });
        const { userId } = result;
        const tokens = await issueTokens(userId);
        setAuthCookies(res, tokens);
        return res.status(200).json({ message: "User successfully logged in" });
    }
    catch (error) {
        return res.status(500).json({ error: "Server error while logging in user" });
    }
};
// POST: /api/auth/refresh
export const refreshTokens = async (req, res) => {
    const userId = res.locals.userId;
    try {
        const tokens = await issueTokens(userId);
        setAuthCookies(res, tokens);
        return res.status(200).json({ message: "Tokens refreshed" });
    }
    catch (error) {
        return res.status(500).json({ error: "Server error while refreshing tokens" });
    }
};
//# sourceMappingURL=auth.controller.js.map