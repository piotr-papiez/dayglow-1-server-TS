// Constants
import { LOAD_USER_DATA_STATUS_CODES } from "../config/user.config.js";
// Utils
import { loadUserData } from "../services/user.service.js";
// GET: /api/user
export const getUserData = async (req, res) => {
    const userId = res.locals.userId;
    const result = await loadUserData(userId);
    if (!result.ok)
        return res.status(LOAD_USER_DATA_STATUS_CODES[result.message]).json({ ...result });
    return res.status(200).json({ ...result });
};
//# sourceMappingURL=user.controller.js.map