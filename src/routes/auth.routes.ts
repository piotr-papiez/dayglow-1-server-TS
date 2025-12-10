import { Router } from "express";

// Middleware
import { requireCookie, requireUser, validateDeleteBody } from "../middleware/auth.middleware.js";

import {
    validateLoginBody, validateRegisterBody, verifyRefreshToken
} from "../middleware/auth.middleware.js";

// Controllers
import {
    registerUser, loginUser, refreshTokens, logoutUser, deleteAccount
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/register", validateRegisterBody, registerUser);
router.post("/auth/login", validateLoginBody, loginUser);
router.post("/auth/refresh", verifyRefreshToken, refreshTokens);
router.post("/auth/logout", requireCookie, logoutUser);

router.delete("/auth/delete", requireUser, validateDeleteBody, deleteAccount);

export default router;