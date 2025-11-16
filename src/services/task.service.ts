// Libraries
import { Types } from "mongoose";

// Models
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

// Types
import type { TaskSchemaType } from "../models/task.model.js";

type DeleteTaskType =
    | { ok: true }
    | { ok: false, message: "INVALID_ID" | "NOT_FOUND" | "NO_PERMISSIONS" | "SERVER_ERROR" };

type LoadTasksType =
    | { ok: true, name: string, tasks: TaskSchemaType[] }
    | { ok: false, message: "USER_NOT_FOUND" | "SERVER_ERROR" };

type SaveTaskType =
    | { ok: true }
    | { ok: false; message: "ALREADY_EXISTS" | "SERVER_ERROR" };

export async function deleteTask(userId: string, taskId: string): Promise<DeleteTaskType> {
    if (!Types.ObjectId.isValid(taskId)) return { ok: false, message: "INVALID_ID" };

    const task = await Task.findById(taskId);
    if (!task) return { ok: false, message: "NOT_FOUND" };

    if (!task.userId.equals(userId)) return { ok: false, message: "NO_PERMISSIONS" };

    try {
        await task.deleteOne();

        return { ok: true };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}

export async function loadTasks(userId: string): Promise<LoadTasksType> {
    const user = await User.findById(userId, "name").lean<{ _id: string, name: string }>();
    if (!user) return { ok: false, message: "USER_NOT_FOUND" };
    const { name } = user;

    try {
        const tasks = await Task.find({ userId });

        return { ok: true, name, tasks };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }


}

export async function saveTask(
    userId: string,
    title: string,
    description?: string
): Promise<SaveTaskType> {
    try {
        await Task.create({ userId, title, description });

        return { ok: true };
    } catch (error: any) {
        if (error?.code === 11000) return { ok: false, message: "ALREADY_EXISTS" };

        return { ok: false, message: "SERVER_ERROR" };
    }
}