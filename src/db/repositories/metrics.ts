import { uuid } from "drizzle-orm/pg-core";
import { InsertRegister, registerTable } from "../schemas/registerSchema";
import { db } from "../setup";
import { and, avg, count, eq, gte, lte } from "drizzle-orm";
import { InsertLogin, loginTable } from "../schemas/loginSchema";

const postRegistrationMetric = async (registrationData: InsertRegister) => {
    const res = await db.insert(registerTable).values(registrationData).returning()
    if (res.length === 0) {
        throw new Error("Failed to insert data");
    }
    return res[0];
}


const deleteRegisters = async () => {
    await db.delete(registerTable);
}

const getRegistrationMetrics = async (dateFrom: Date, dateTo: Date) => {
    const totalSuccess = await db.select({
        res: count()
    }).from(registerTable)
    .where(and(eq(registerTable.success, true), gte(registerTable.createdAt, dateFrom), lte(registerTable.createdAt, dateTo)));
    
    const total = await db.select({
        res: count()
    }).from(registerTable);

    const averageRegistrationTimeResponse = await db.select({
        res: avg(registerTable.registrationTime)
    }).from(registerTable);

    if (!averageRegistrationTimeResponse[0].res){
        return {
            totalSuccess: totalSuccess[0].res,
            successRate: totalSuccess[0].res / total[0].res,
            averageRegistrationTime: 0
        }
    }

    const averageRegistrationTime = parseInt(averageRegistrationTimeResponse[0].res);

    const methodsCount = await db.select({
        method: registerTable.method,
        res: count()
    }).from(registerTable)
    .where(and(gte(registerTable.createdAt, dateFrom), lte(registerTable.createdAt, dateTo), eq(registerTable.success, true)))
    .groupBy(registerTable.method);

    return {
        totalSuccess: totalSuccess[0].res,
        successRate: totalSuccess[0].res / total[0].res,
        averageRegistrationTime,
        emailCount: methodsCount.find((method) => method.method === 'email')?.res || 0,
        googleCount: methodsCount.find((method) => method.method === 'google')?.res || 0
    }
}

const deleteLogins = async () => {
    await db.delete(loginTable);
}

const postLoginMetric = async (loginData: InsertLogin) => {
    const res = await db.insert(loginTable).values(loginData).returning()
    if (res.length === 0) {
        throw new Error("Failed to insert data");
    }
    return res[0];
}

const getLoginMetrics = async(dateFrom: Date, dateTo: Date) => {
    const totalSuccess = await db.select({
        res: count()
    }).from(loginTable)
    .where(and(eq(loginTable.success, true), gte(loginTable.createdAt, dateFrom), lte(loginTable.createdAt, dateTo)));
    
    const total = await db.select({
        res: count()
    }).from(loginTable);

    const averageLoginTimeResponse = await db.select({
        res: avg(loginTable.loginTime)
    }).from(loginTable);

    if (!averageLoginTimeResponse[0].res){
        return {
            totalSuccess: totalSuccess[0].res,
            successRate: totalSuccess[0].res / total[0].res,
            averageLoginTime: 0
        }
    }

    const averageLoginTime = parseInt(averageLoginTimeResponse[0].res);

    const methodsCount = await db.select({
        method: loginTable.method,
        res: count()
    }).from(loginTable)
    .where(and(gte(loginTable.createdAt, dateFrom), lte(loginTable.createdAt, dateTo), eq(loginTable.success, true)))
    .groupBy(loginTable.method);

    return {
        totalSuccess: totalSuccess[0].res,
        successRate: totalSuccess[0].res / total[0].res,
        averageLoginTime,
        emailCount: methodsCount.find((method) => method.method === 'email')?.res || 0,
        googleCount: methodsCount.find((method) => method.method === 'google')?.res || 0
    }
}




export default {
    postRegistrationMetric,
    deleteRegisters,
    getRegistrationMetrics,
    postLoginMetric,
    deleteLogins,
    getLoginMetrics
}
