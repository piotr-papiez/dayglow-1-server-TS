// Constants
import {
    DELETE_TASK_STATUS_CODES, LOAD_TASKS_STATUS_CODES, SAVE_TASK_STATUS_CODES
} from "../config/task.config.js";

// Services
import { deleteTask, loadTasks, saveTask } from "../services/task.service.js";

// Types
import type { Request, Response } from "express";
import type { CreateTaskBodyType } from "../validators/task.validator.js";

// DELETE: /api/tasks/:taskId
export const finishTask = async (req: Request<{ taskId: string }>, res: Response) => {
    const userId = res.locals.userId as string;
    const taskId = req.params.taskId;

    try {
        const result = await deleteTask(userId, taskId);
        if (!result.ok) return res.status(DELETE_TASK_STATUS_CODES[result.message]).json({ error: result.message });

        return res.status(200).json({ message: "Task removed" });
    } catch (error) {
        return res.status(500).json({ error: "Server error while removing task" });
    }
};

// GET: /api/tasks
export const getTasks = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;

    try {
        const result = await loadTasks(userId);
        if (!result.ok) return res.status(LOAD_TASKS_STATUS_CODES[result.message]).json({ error: result.message });
        const { name, tasks } = result;

        return res.status(200).json({ name, tasks });
    } catch (error) {
        return res.status(500).json({ error: "Server error while loading tasks" });
    }
};

// POST: /api/tasks
export const createTask = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { title, description } = res.locals.taskBody as CreateTaskBodyType;
    try {
        const result = await saveTask(userId, title, description);
        if (!result.ok) return res.status(SAVE_TASK_STATUS_CODES[result.message]).json({ error: result.message });

        return res.status(201).json({ message: "Task successfully created" });
    } catch (error) {
        return res.status(500).json({ error: "Server error while creating new task" });
    }
};