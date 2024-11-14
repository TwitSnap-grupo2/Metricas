import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const loginTable = pgTable("user_login_metrics", {
    id: uuid("id").defaultRandom().primaryKey(),
    success: boolean("success").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    method: text("method").notNull(),
    loginTime: integer("login_time").notNull(),
    location: text("location").notNull(),
});

export type SelectLogin = typeof loginTable.$inferSelect;
export type InsertLogin = typeof loginTable.$inferInsert;