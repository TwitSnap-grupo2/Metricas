import { InsertRegister } from "../db/schemas/registerSchema";
import db from "../db/repositories/metrics";

const postRegistrationMetric = async (registrationData: InsertRegister) => {
    return await db.postRegistrationMetric(registrationData);

}

const getRegistrationMetrics = async (dateFrom: Date, dateTo: Date) => {
    return await db.getRegistrationMetrics(dateFrom, dateTo);
}

export default {
    postRegistrationMetric,
    getRegistrationMetrics
}