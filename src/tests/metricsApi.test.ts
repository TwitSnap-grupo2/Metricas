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
})