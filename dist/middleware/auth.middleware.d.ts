import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { RegisterBodyType, LoginBodyType } from "../validators/auth.validator.js";
export declare const validateRegisterBody: RequestHandler<{}, any, RegisterBodyType>;
export declare const validateLoginBody: RequestHandler<{}, any, LoginBodyType>;
export declare const verifyRefreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const requireUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.middleware.d.ts.map