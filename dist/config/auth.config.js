export const ACCESS_TOKEN_TTL = 15 * 60 * 1000;
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;
export const COOKIE_SETTINGS = {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
};
export const CREATE_USER_STATUS_CODES = {
    ALREADY_EXISTS: 409,
    SERVER_ERROR: 500
};
export const VALIDATE_USER_CREDENTIALS_STATUS_CODES = {
    USER_NOT_FOUND: 404,
    SERVER_ERROR: 500,
    INVALID_PASSWORD: 401
};
export const DELETE_ACCOUNT_STATUS_CODES = {
    USER_NOT_FOUND: 404,
    SERVER_ERROR: 500,
    INVALID_PASSWORD: 401
};
//# sourceMappingURL=auth.config.js.map