export declare const ACCESS_TOKEN_TTL: number;
export declare const REFRESH_TOKEN_TTL: number;
export declare const COOKIE_SETTINGS: {
    readonly httpOnly: true;
    readonly sameSite: "none";
    readonly secure: true;
    readonly path: "/";
    readonly domain: "https://dayglow-ts.onrender.com/";
};
export declare const CREATE_USER_STATUS_CODES: {
    readonly ALREADY_EXISTS: 409;
    readonly SERVER_ERROR: 500;
};
export declare const VALIDATE_USER_CREDENTIALS_STATUS_CODES: {
    readonly USER_NOT_FOUND: 404;
    readonly SERVER_ERROR: 500;
    readonly INVALID_PASSWORD: 401;
};
export declare const DELETE_ACCOUNT_STATUS_CODES: {
    readonly USER_NOT_FOUND: 404;
    readonly SERVER_ERROR: 500;
    readonly INVALID_PASSWORD: 401;
};
//# sourceMappingURL=auth.config.d.ts.map