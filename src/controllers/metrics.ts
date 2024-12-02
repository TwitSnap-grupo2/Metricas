import { Router, Request, Response, NextFunction } from "express";
import {
  getSchema,
  newApiKeySchema,
  postBlockSchema,
  postLoginSchema,
  postRecoverPasswordSchema,
  postRegisterSchema,
} from "../utils/validationSchemas";
import metricService from "../services/metrics";
import { InsertRegister } from "../db/schemas/registerSchema";
import { InsertLogin } from "../db/schemas/loginSchema";
import { InsertBlock } from "../db/schemas/blockSchema";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const registrationData: InsertRegister = await postRegisterSchema.parse(
      req.body
    );
    const result = await metricService.postRegistrationMetric(registrationData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/register", async (req, res, next) => {
  try {
    const registrationData = await getSchema.parse(req.query);
    const dateFrom = new Date(registrationData.date_from);
    const dateTo = new Date(registrationData.date_to);
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
});

router.get("/login", async (req, res, next) => {
  try {
    const loginData = await getSchema.parse(req.query);
    const dateFrom = new Date(loginData.date_from);
    const dateTo = new Date(loginData.date_to);
    const result = await metricService.getLoginMetrics(dateFrom, dateTo);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/block", async (req, res, next) => {
  try {
    const blockData: InsertBlock = await postBlockSchema.parse(req.body);
    const result = await metricService.postBlockMetric(blockData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/block", async (req, res, next) => {
  try {
    const blockData = await getSchema.parse(req.query);
    const dateFrom = new Date(blockData.date_from);
    const dateTo = new Date(blockData.date_to);
    const result = await metricService.getBlockMetrics(dateFrom, dateTo);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/recoverPassword", async (req, res, next) => {
  try {
    const recoverPasswordData = await postRecoverPasswordSchema.parse(req.body);
    const result = await metricService.postRecoverPasswordMetric(
      recoverPasswordData
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/recoverPassword", async (req, res, next) => {
  try {
    const recoverPasswordData = await getSchema.parse(req.query);
    const dateFrom = new Date(recoverPasswordData.date_from);
    const dateTo = new Date(recoverPasswordData.date_to);
    const result = await metricService.getRecoverPasswordMetrics(
      dateFrom,
      dateTo
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/apiKey", async (req, res, next) => {
  try {
    const data = newApiKeySchema.parse(req.body);
    process.env["API_KEY"] = data.apiKey;
    console.log("New apiKey: ", process.env["API_KEY"]);
    res.status(200).json({ apiKey: data.apiKey });
  } catch (err: unknown) {
    next(err);
  }
});

export default router;
