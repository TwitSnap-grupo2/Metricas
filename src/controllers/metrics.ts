import { Router, Request, Response, NextFunction } from "express";
import {getSchema, postBlockSchema, postLoginSchema, postRecoverPasswordSchema, postRegisterSchema} from "../utils/validationSchemas";
import  metricService from "../services/metrics";
import { InsertRegister } from "../db/schemas/registerSchema";
import { InsertLogin } from "../db/schemas/loginSchema";
import { InsertBlock } from "../db/schemas/blockSchema";

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
        const registrationData = await getSchema.parse(req.query);
        const dateFrom = new Date(registrationData.from);
        const dateTo = new Date(registrationData.to);
        const result = await metricService.getRegistrationMetrics(dateFrom, dateTo);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
});


router.post("/login", async (req, res, next) => {
    try {
        const loginData: InsertLogin = await postLoginSchema.parse(req.body);
        const result = await metricService.postLoginMetric(loginData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
);

router.get("/login", async (req, res, next) => {
    try {
        const loginData = await getSchema.parse(req.query);
        const dateFrom = new Date(loginData.from);
        const dateTo = new Date(loginData.to);
        const result = await metricService.getLoginMetrics(dateFrom, dateTo);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
}
);

router.post("/block", async (req, res, next) => {
    try {
        const blockData: InsertBlock = await postBlockSchema.parse(req.body);
        const result = await metricService.postBlockMetric(blockData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
);

router.get("/block", async (req, res, next) => {
    try {
        const blockData = await getSchema.parse(req.query);
        const dateFrom = new Date(blockData.from);
        const dateTo = new Date(blockData.to);
        const result = await metricService.getBlockMetrics(dateFrom, dateTo);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
}
)

router.post("/recoverPassword", async (req, res, next) => {
    try {
        const recoverPasswordData = await postRecoverPasswordSchema.parse(req.body);
        const result = await metricService.postRecoverPasswordMetric(recoverPasswordData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
);

router.get("/recoverPassword", async (req, res, next) => {
    try {
        const recoverPasswordData = await getSchema.parse(req.query);
        const dateFrom = new Date(recoverPasswordData.from);
        const dateTo = new Date(recoverPasswordData.to);
        const result = await metricService.getRecoverPasswordMetrics(dateFrom, dateTo);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
}
);

export default router;

