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

export type RegisterBodyType = z.infer<typeof registerValidator>;
export type LoginBodyType = z.infer<typeof loginValidator>;