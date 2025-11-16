import jwt from "jsonwebtoken";
const ACCESS_TTL = "15m";
const REFRESH_TTL = "30d";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export function signAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}
export function signRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}
export function decodeAccessToken(token) {
    if (!token)
        return undefined;
    try {
        const { userId } = jwt.verify(token, ACCESS_SECRET);
        return userId;
    }
    catch (error) {
        return undefined;
    }
}
export function decodeRefreshToken(token) {
    if (!token)
        return undefined;
    try {
        const { userId } = jwt.verify(token, REFRESH_SECRET);
        return userId;
    }
    catch (error) {
        return undefined;
    }
}
//# sourceMappingURL=jwt.lib.js.map