import { Router } from "express";
import { validateLoginBody, validateRegisterBody, verifyRefreshToken } from "../middleware/auth.middleware.js";
import { registerUser, loginUser, refreshTokens } from "../controllers/auth.controller.js";
const router = Router();
router.post("/auth/register", validateRegisterBody, registerUser);
router.post("/auth/login", validateLoginBody, loginUser);
router.post("/auth/refresh", verifyRefreshToken, refreshTokens);
export default router;
//# sourceMappingURL=auth.routes.js.map