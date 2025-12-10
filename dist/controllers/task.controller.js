// Constants
import { DELETE_TASK_STATUS_CODES, LOAD_TASKS_STATUS_CODES, SAVE_TASK_STATUS_CODES } from "../config/task.config.js";
// Services
import { deleteTask, loadTasks, saveTask } from "../services/task.service.js";
// POST: /api/tasks
export const createTask = async (req, res) => {
    const userId = res.locals.userId;
    const { title, description } = res.locals.taskBody;
    try {
        const result = await saveTask(userId, title, description);
        if (!result.ok)
            return res.status(SAVE_TASK_STATUS_CODES[result.message]).json({ ...result });
        return res.status(201).json({ ...result });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// GET: /api/tasks
export const getTasks = async (req, res) => {
    const userId = res.locals.userId;
    try {
        const result = await loadTasks(userId);
        if (!result.ok)
            return res.status(LOAD_TASKS_STATUS_CODES[result.message]).json({ ...result });
        return res.status(200).json({ ...result });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
// DELETE: /api/tasks/:taskId
export const finishTask = async (req, res) => {
    const userId = res.locals.userId;
    const taskId = req.params.taskId;
    try {
        const result = await deleteTask(userId, taskId);
        if (!result.ok)
            return res.status(DELETE_TASK_STATUS_CODES[result.message]).json({ ...result });
        return res.status(200).json({ ...result });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: "SERVER_ERROR" });
    }
};
//# sourceMappingURL=task.controller.js.map