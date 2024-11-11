import { uuid } from "drizzle-orm/pg-core";
import { InsertRegister, registerTable } from "../schemas/registerSchema";
import { db } from "../setup";

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


export default {
    postRegistrationMetric,
    deleteRegisters
}
