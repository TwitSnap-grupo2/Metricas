import {describe, expect, test} from '@jest/globals';
import supertest from "supertest";
import app from "../app";
import metricsRepository from "../db/repositories/metrics";
import { SelectRegister } from '../db/schemas/registerSchema';

const api = supertest(app);

describe("register metrics", () => {
    beforeEach(async () => {
        await metricsRepository.deleteRegisters();
      });

    test("can be posted", async () => {
        const response = await api.post("/api/metrics/register").send({
            success: true,
            method: 'email',
            registrationTime: 30,
            location: 'ARG'

        }).expect(201);
        const body: SelectRegister = response.body;
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.method).toBe('email');
        expect(body.registrationTime).toBe(30);
        expect(body.location).toBe('ARG');
    });

    test("cannot be posted with invalid data", async () => {
        await api.post("/api/metrics/register").send({
            success: 'blue',
            method: 'email',
            registrationTime: 30,
        }).expect(400);
    }
    );

    test("can be obtained with all methods", async () => {
        await api.post("/api/metrics/register").send({
            success: true,
            method: 'email',
            registrationTime: 30,
            location: 'ARG'
        });

        await api.post("/api/metrics/register").send({
            success: true,
            method: 'google',
            registrationTime: 10,
            location: 'ARG'
        });

        await api.post("/api/metrics/register").send({
            success: false,
            method: 'email',
            registrationTime: 30,
            location: 'BRA'
        });



        const res = await api.get("/api/metrics/register").query({
            from: new Date(0).toISOString(),
            to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.totalSuccess).toBe(2);
        expect(body.successRate).toBe(2/3);
        expect(body.averageRegistrationTime).toBe(23);
    });

    test("methods can be counted", async () => {
        await api.post("/api/metrics/register").send({
            success: true,
            method: 'email',
            registrationTime: 30,
            location: 'ARG'
        });

        await api.post("/api/metrics/register").send({
            success: true,
            method: 'google',
            registrationTime: 10,
            location: 'ARG'
        });

        await api.post("/api/metrics/register").send({
            success: true,
            method: 'email',
            registrationTime: 30,
            location: 'BRA'
        });
        await api.post("/api/metrics/register").send({
            success: false,
            method: 'email',
            registrationTime: 30,
            location: 'BRA'
        });

        const res = await api.get("/api/metrics/register").query({
            from: new Date(0).toISOString(),
            to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.emailCount).toBe(2);
        expect(body.googleCount).toBe(1);
    }
    );
})

describe("login metrics", () => {
    beforeEach(async () => {
        await metricsRepository.deleteLogins();
      });

    test("can be posted", async () => {
        const response = await api.post("/api/metrics/login").send({
            success: true,
            method: 'email',
            loginTime: 30,
            location: 'ARG'

        }).expect(201);
        const body = response.body;
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.method).toBe('email');
        expect(body.loginTime).toBe(30);
        expect(body.location).toBe('ARG');
    });

    test("cannot be posted with invalid data", async () => {
        await api.post("/api/metrics/login").send({
            success: 'blue',
            method: 'email',
            loginTime: 30,
        }).expect(400);
    }
    );

    test("can be obtained with all methods", async () => {
        await api.post("/api/metrics/login").send({
            success: true,
            method: 'email',
            loginTime: 30,
            location: 'ARG'
        });

        await api.post("/api/metrics/login").send({
            success: true,
            method: 'google',
            loginTime: 10,
            location: 'ARG'
        });

        await api.post("/api/metrics/login").send({
            success: false,
            method: 'email',
            loginTime: 30,
            location: 'BRA'
        });

        const res = await api.get("/api/metrics/login").query({
            from: new Date(0).toISOString(),
            to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.totalSuccess).toBe(2);
        expect(body.successRate).toBe(2/3);
        expect(body.averageLoginTime).toBe(23);
        expect(body.emailCount).toBe(1);
        expect(body.googleCount).toBe(1);

    });
})


