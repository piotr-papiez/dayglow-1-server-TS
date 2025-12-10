import z from "zod";
export declare const registerValidator: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const loginValidator: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const deleteValidator: z.ZodObject<{
    userId: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export type RegisterBodyType = z.infer<typeof registerValidator>;
export type LoginBodyType = z.infer<typeof loginValidator>;
export type DeleteBodyType = z.infer<typeof deleteValidator>;
//# sourceMappingURL=auth.validator.d.ts.map