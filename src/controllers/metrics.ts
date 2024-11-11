import { Router, Request, Response, NextFunction } from "express";
import registerSchema from "../utils/validationSchemas";
import  metricService from "../services/metrics";
import { InsertRegister } from "../db/schemas/registerSchema";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const registrationData: InsertRegister = await registerSchema.parse(req.body);
        const result = await metricService.postRegistrationMetric(registrationData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
);

export default router;

