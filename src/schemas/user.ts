import { z } from "zod"

export const UserRegisterSchema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number"),
})

export const UserLoginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type UserRegister = z.infer<typeof UserRegisterSchema>
export type UserLogin = z.infer<typeof UserLoginSchema>
