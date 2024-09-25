import { z } from "zod"

export const EnvSchema = z.object({
    VITE_BACKEND_API_URL: z.string(),
})

export const ENV = EnvSchema.parse(import.meta.env)

export const BACKEND_API_URL = ENV.VITE_BACKEND_API_URL
