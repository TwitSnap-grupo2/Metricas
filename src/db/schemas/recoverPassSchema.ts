import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const recoveryPassTable = pgTable("recover_password_metrics", {
    id: uuid("id").defaultRandom().primaryKey(),
    success: boolean("success").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    recoveryTime: integer("recovery_time").notNull(),
});

export type SelectRecoveryPass = typeof recoveryPassTable.$inferSelect;
export type InsertRecoveryPass = typeof recoveryPassTable.$inferInsert;