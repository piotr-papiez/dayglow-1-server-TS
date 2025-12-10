// Libraries
import { Router } from "express";

// Middleware
import { requireUser } from "../middleware/auth.middleware.js";

// Controllers
import { getUserData } from "../controllers/user.controller.js";

const router = Router();

router.get("/user", requireUser, getUserData);

export default router;