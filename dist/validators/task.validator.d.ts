import z from "zod";
export declare const taskValidator: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export type CreateTaskBodyType = z.infer<typeof taskValidator>;
//# sourceMappingURL=task.validator.d.ts.map