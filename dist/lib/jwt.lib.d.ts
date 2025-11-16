export declare function signAccessToken(payload: {
    userId: string;
}): string;
export declare function signRefreshToken(payload: {
    userId: string;
}): string;
export declare function decodeAccessToken(token?: string): string | undefined;
export declare function decodeRefreshToken(token?: string): string | undefined;
//# sourceMappingURL=jwt.lib.d.ts.map