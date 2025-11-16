// Constants
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, COOKIE_SETTINGS } from "../config/auth.config.js";
// Libraries
import { decodeAccessToken, decodeRefreshToken } from "../lib/jwt.lib.js";
import xss from "xss";
// Models
import { User } from "../models/user.model.js";
// Validators
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
export const validateRegisterBody = async (req, res, next) => {
    const validatedRequest = registerValidator.safeParse(req.body);
    if (!validatedRequest.success)
        return res.status(400).json({ error: "Validation error — invalid register data" });
    let { name, email, password } = validatedRequest.data;
    name = xss(name);
    res.locals.registerBody = { name, email, password };
    next();
};
export const validateLoginBody = async (req, res, next) => {
    const validatedRequest = loginValidator.safeParse(req.body);
    if (!validatedRequest.success)
        return res.status(400).json({ error: "Validation error — invalid user data" });
    const { email, password } = validatedRequest.data;
    res.locals.loginBody = { email, password };
    return next();
};
export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    const userId = decodeRefreshToken(refreshToken);
    if (!userId)
        return res.status(401).json({ error: "Unauthorized — Invalid or missing refreshToken" });
    try {
        const userData = await User.findById(userId);
        if (!userData)
            return res.status(404).json({ error: "User not found" });
        res.locals.userId = userId;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: "Server error while verifying refresh token" });
    }
};
export const requireUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const userId = decodeAccessToken(accessToken);
    if (!userId)
        return res.status(401).json({ error: "Unauthorized — Invalid or missing accessToken" });
    res.locals.userId = userId;
    return next();
};
//# sourceMappingURL=auth.middleware.js.map