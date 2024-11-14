import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const blockTable = pgTable("block_metrics", {
    id: uuid("id").defaultRandom().primaryKey(),
    reason: text("reason").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    blockDuration: integer("block_duration").notNull(),
});

export type SelectBlock = typeof blockTable.$inferSelect;
export type InsertBlock = typeof blockTable.$inferInsert;