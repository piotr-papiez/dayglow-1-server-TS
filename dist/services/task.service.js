// Libraries
import { Types } from "mongoose";
// Models
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
export async function deleteTask(userId, taskId) {
    if (!Types.ObjectId.isValid(taskId))
        return { ok: false, message: "INVALID_ID" };
    const task = await Task.findById(taskId);
    if (!task)
        return { ok: false, message: "USER_NOT_FOUND" };
    if (!task.userId.equals(userId))
        return { ok: false, message: "NO_PERMISSIONS" };
    try {
        await task.deleteOne();
        return { ok: true };
    }
    catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}
export async function loadTasks(userId) {
    const user = await User.findById(userId).lean();
    if (!user)
        return { ok: false, message: "USER_NOT_FOUND" };
    try {
        const tasks = await Task.find({ userId }).sort({ _id: 1 });
        return { ok: true, tasks };
    }
    catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}
export async function saveTask(userId, title, description) {
    try {
        await Task.create({ userId, title, description });
        return { ok: true };
    }
    catch (error) {
        if (error?.code === 11000)
            return { ok: false, message: "ALREADY_EXISTS" };
        return { ok: false, message: "SERVER_ERROR" };
    }
}
//# sourceMappingURL=task.service.js.map