import { InsertRegister } from "../db/schemas/registerSchema";
import db from "../db/repositories/metrics";

const postRegistrationMetric = async (registrationData: InsertRegister) => {
    return await db.postRegistrationMetric(registrationData);

}

export default {
    postRegistrationMetric,
}