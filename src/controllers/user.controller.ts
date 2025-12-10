// Constants
import { LOAD_USER_DATA_STATUS_CODES } from "../config/user.config.js";

// Utils
import { loadUserData } from "../services/user.service.js";

// Types
import type { Request, Response } from "express";

// GET: /api/user
export const getUserData = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;

    const result = await loadUserData(userId);

    if (!result.ok) return res.status(LOAD_USER_DATA_STATUS_CODES[result.message]).json({ ...result });

    return res.status(200).json({ ...result });
};