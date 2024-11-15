import {describe, expect, test} from '@jest/globals';
import supertest from "supertest";
import app from "../app";
import metricsRepository from "../db/repositories/metrics";
import { SelectRegister } from '../db/schemas/registerSchema';
import { METHODS } from 'http';

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
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.totalSuccess).toBe(2);
        expect(body.successRate).toBe(2/3);
        expect(body.averageRegistrationTime).toBe(20);
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
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.emailCount).toBe(2);
        expect(body.googleCount).toBe(1);
    }
    );

    test("locations can be counted", async () => {
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
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.locationCount).toEqual([
            {
                location: 'ARG',
                res: 2
            },
            {
                location: 'BRA',
                res: 1
            }
        ]);
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
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.totalSuccess).toBe(2);
        expect(body.successRate).toBe(2/3);
        expect(body.averageLoginTime).toBe(20);
        expect(body.emailCount).toBe(1);
        expect(body.googleCount).toBe(1);

    });

    test("locations can be counted", async () => {
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
            success: true,
            method: 'email',
            loginTime: 30,
            location: 'BRA'
        });
        await api.post("/api/metrics/login").send({
            success: false,
            method: 'email',
            loginTime: 30,
            location: 'BRA'
        });

        const res = await api.get("/api/metrics/login").query({
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;

        expect(body.locationCount).toEqual([
            {
                location: 'ARG',
                res: 2
            },
            {
                location: 'BRA',
                res: 1
            }
        ]);
    }
    );

})

describe("block metrics", () => {

    beforeEach(async () => {
        await metricsRepository.deleteBlocks();
      });

    test("can be posted", async () => {
        const response = await api.post("/api/metrics/block").send({
            reason: 'spam',
            blockDuration: 30
        }).expect(201);
        const body = response.body;
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.reason).toBe('spam');
        expect(body.blockDuration).toBe(30);
    }
    );

    test("cannot be posted with invalid data", async () => {
        await api.post("/api/metrics/block").send({
            reason: 'spam',
        }).expect(400);
    }
    );

    test("can be obtained", async () => {
        await api.post("/api/metrics/block").send({
            reason: 'spam',
            blockDuration: 30
        });

        await api.post("/api/metrics/block").send({
            reason: 'spam',
            blockDuration: 10
        });

        await api.post("/api/metrics/block").send({
            reason: 'explicit content',
            blockDuration: 20
        });

        const res = await api.get("/api/metrics/block").query(
            {
                date_from: new Date(0).toISOString(),
                date_to: new Date().toISOString(),
            }
        ).expect(200);

        const body = res.body;

        expect(body.totalBlocks).toBe(3);

        expect(body.averageBlockDuration).toBe(20);

        expect(body.reasonsCount).toEqual([
            {
                reason: 'explicit content',
                res: 1
            },
            {
                reason: 'spam',
                res: 2
            },
            
        ]);


    }
    );
    
})


describe("recover password metrics", () => {
    beforeEach(async () => {
        await metricsRepository.deleteRecoverPasswords();
      });

    test("can be posted", async () => {
        const response = await api.post("/api/metrics/recoverPassword").send({
            success: true,
            recoveryTime: 30,
        }).expect(201);
        const body = response.body;
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.recoveryTime).toBe(30);
    });

    test("cannot be posted with invalid data", async () => {
        await api.post("/api/metrics/recoverPassword").send({
            success: 'blue',
            recoverTime: 30,
        }).expect(400);
    }
    );

    test("can be obtained with all methods", async () => {
        await api.post("/api/metrics/recoverPassword").send({
            success: true,
            recoveryTime: 30,
        });

        await api.post("/api/metrics/recoverPassword").send({
            success: true,
            recoveryTime: 10,
        });

        await api.post("/api/metrics/recoverPassword").send({
            success: false,
            recoveryTime: 30,
        });

        const res = await api.get("/api/metrics/recoverPassword").query({
            date_from: new Date(0).toISOString(),
            date_to: new Date().toISOString(),

        }).expect(200);

        const body = res.body;


        expect(body.total).toBe(3);
        expect(body.successRate).toBe(2/3);
        expect(body.averageRecoverPasswordTime).toBe(20);

    });
});