type LoadUserDataType = {
    ok: true;
    name: string;
} | {
    ok: false;
    message: "USER_NOT_FOUND" | "SERVER_ERROR";
};
export declare function loadUserData(userId: string): Promise<LoadUserDataType>;
export {};
//# sourceMappingURL=user.service.d.ts.map