// Libraries
import { Router } from "express";

// Middleware
import { requireUser } from "../middleware/auth.middleware.js";
import { validateTaskBody } from "../middleware/task.middleware.js";

// Controllers
import { createTask, finishTask, getTasks } from "../controllers/task.controller.js";

const router = Router();

router.delete("/tasks/:taskId", requireUser, finishTask);

router.get("/tasks", requireUser, getTasks);

router.post("/tasks", requireUser, validateTaskBody, createTask);

export default router;