import {z } from 'zod';

export const postRegisterSchema = z.object({
    success: z.boolean(),
    method: z.enum(['email', 'google']),
    registrationTime: z.number(),
    location: z.string(),
})

export const getRegisterSchema = z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
})


