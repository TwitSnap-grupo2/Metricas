import {z } from 'zod';

const registerSchema = z.object({
    success: z.boolean(),
    method: z.string(),
    registrationTime: z.number(),
    location: z.string(),
})

export default registerSchema;