import {z } from 'zod';

export const postRegisterSchema = z.object({
    success: z.boolean(),
    method: z.enum(['email', 'google']),
    registrationTime: z.number(),
    location: z.string(),
})

export const getSchema = z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
})

export const postLoginSchema = z.object({
    success: z.boolean(),
    method: z.enum(['email', 'google']),
    loginTime: z.number(),
    location: z.string(),
})

export const postBlockSchema = z.object({
    reason: z.string(),
    blockDuration: z.number(),
})


export const postRecoverPasswordSchema = z.object({
    success: z.boolean(),
    recoveryTime: z.number(),
    method: z.enum(['email', 'google']),
})
