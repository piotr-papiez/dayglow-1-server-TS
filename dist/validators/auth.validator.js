import z from "zod";
export const registerValidator = z.object({
    name: z.string().min(2).max(48),
    email: z.email(),
    password: z.string().min(5).max(128)
});
export const loginValidator = z.object({
    email: z.email(),
    password: z.string().min(1)
});
export const deleteValidator = z.object({
    userId: z.string(),
    password: z.string().min(1)
});
//# sourceMappingURL=auth.validator.js.map