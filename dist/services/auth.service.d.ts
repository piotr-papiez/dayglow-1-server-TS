import type { LoginBodyType, RegisterBodyType, DeleteBodyType } from "../validators/auth.validator.js";
type CreateUserType = {
    ok: true;
} | {
    ok: false;
    message: "ALREADY_EXISTS" | "SERVER_ERROR";
};
type ValidateUserCredentialsType = {
    ok: true;
    userId: string;
} | {
    ok: false;
    message: "USER_NOT_FOUND" | "SERVER_ERROR" | "INVALID_PASSWORD";
};
type DeleteUserType = {
    ok: true;
} | {
    ok: false;
    message: "INVALID_PASSWORD" | "USER_NOT_FOUND" | "SERVER_ERROR";
};
export declare function createUser(registerBody: RegisterBodyType): Promise<CreateUserType>;
export declare function validateUserCredentials(loginBody: LoginBodyType): Promise<ValidateUserCredentialsType>;
export declare function issueTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare function deleteUser(deleteBody: DeleteBodyType): Promise<DeleteUserType>;
export {};
//# sourceMappingURL=auth.service.d.ts.map