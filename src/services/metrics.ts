import { InsertRegister } from "../db/schemas/registerSchema";
import db from "../db/repositories/metrics";
import { InsertLogin } from "../db/schemas/loginSchema";
import { InsertBlock } from "../db/schemas/blockSchema";

const postRegistrationMetric = async (registrationData: InsertRegister) => {
    return await db.postRegistrationMetric(registrationData);

}

const getRegistrationMetrics = async (dateFrom: Date, dateTo: Date) => {
    return await db.getRegistrationMetrics(dateFrom, dateTo);
}

const postLoginMetric = async (loginData: InsertLogin) => {
    return await db.postLoginMetric(loginData);
}

const getLoginMetrics = async (dateFrom: Date, dateTo: Date) => {
    return await db.getLoginMetrics(dateFrom, dateTo);
}

const postBlockMetric = async (blockData: InsertBlock) => {
    return await db.postBlockMetric(blockData);
}

const getBlockMetrics = async (dateFrom: Date, dateTo: Date) => {
    return await db.getBlockMetrics(dateFrom, dateTo);
}

export default {
    postRegistrationMetric,
    getRegistrationMetrics,
    postLoginMetric,
    getLoginMetrics,
    postBlockMetric,
    getBlockMetrics
}