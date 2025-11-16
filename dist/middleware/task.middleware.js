// Libraries
import xss from "xss";
// Validators
import { taskValidator } from "../validators/task.validator.js";
export const validateTaskBody = async (req, res, next) => {
    const validatedData = taskValidator.safeParse(req.body);
    if (!validatedData.success)
        return res.status(400).json({ error: "Validation error — invalid task data" });
    let { title, description } = validatedData.data;
    title = xss(title);
    if (description) {
        xss(description);
    }
    res.locals.taskBody = { title, description };
    return next();
};
//# sourceMappingURL=task.middleware.js.map