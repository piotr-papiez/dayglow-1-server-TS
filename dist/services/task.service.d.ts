import type { TaskSchemaType } from "../models/task.model.js";
type DeleteTaskType = {
    ok: true;
} | {
    ok: false;
    message: "INVALID_ID" | "USER_NOT_FOUND" | "NO_PERMISSIONS" | "SERVER_ERROR";
};
type LoadTasksType = {
    ok: true;
    name: string;
    tasks: TaskSchemaType[];
} | {
    ok: false;
    message: "USER_NOT_FOUND" | "SERVER_ERROR";
};
type SaveTaskType = {
    ok: true;
} | {
    ok: false;
    message: "ALREADY_EXISTS" | "SERVER_ERROR";
};
export declare function deleteTask(userId: string, taskId: string): Promise<DeleteTaskType>;
export declare function loadTasks(userId: string): Promise<LoadTasksType>;
export declare function saveTask(userId: string, title: string, description?: string): Promise<SaveTaskType>;
export {};
//# sourceMappingURL=task.service.d.ts.map