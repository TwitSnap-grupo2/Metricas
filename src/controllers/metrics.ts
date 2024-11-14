import { Router, Request, Response, NextFunction } from "express";
import {getRegisterSchema, postRegisterSchema} from "../utils/validationSchemas";
import  metricService from "../services/metrics";
import { InsertRegister } from "../db/schemas/registerSchema";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const registrationData: InsertRegister = await postRegisterSchema.parse(req.body);
        const result = await metricService.postRegistrationMetric(registrationData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
);

router.get("/register", async (req, res, next) => {
    try {
        const registrationData = await getRegisterSchema.parse(req.query);
        const dateFrom = new Date(registrationData.from);
        const dateTo = new Date(registrationData.to);
        const result = await metricService.getRegistrationMetrics(dateFrom, dateTo);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }  
});

export default router;

