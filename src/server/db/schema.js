import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersData = sqliteTable("usersData", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});