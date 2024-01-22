import { z } from 'zod';

const envSchema = z.object({
    EXPO_PUBLIC_URL_BASE: z.string().url(),
    EXPO_PUBLIC_API_KEY: z.string()
});

export const env = envSchema.parse(process.env);