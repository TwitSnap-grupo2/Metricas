import {z } from 'zod';

const registerSchema = z.object({
    success: z.boolean(),
    method: z.enum(['email', 'google']),
    registrationTime: z.number(),
    location: z.string(),
})

export default registerSchema;