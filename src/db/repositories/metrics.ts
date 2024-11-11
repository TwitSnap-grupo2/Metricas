import { uuid } from "drizzle-orm/pg-core";
import { InsertRegister, registerTable } from "../schemas/registerSchema";
import { db } from "../setup";

const postRegistrationMetric = async (registrationData: InsertRegister) => {
    return await db.insert(registerTable).values(registrationData).returning()

}



export default {
    postRegistrationMetric,
}
