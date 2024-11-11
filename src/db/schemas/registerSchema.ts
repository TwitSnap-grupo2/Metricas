import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const registerTable = pgTable("user_registration_metrics", {
    id: uuid("id").defaultRandom().primaryKey(),
    success: boolean("success").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    method: text("method").notNull(),
    registrationTime: integer("registration_time").notNull(),
    location: text("location").notNull(),
});

export type SelectRegister = typeof registerTable.$inferSelect;
export type InsertRegister = typeof registerTable.$inferInsert;