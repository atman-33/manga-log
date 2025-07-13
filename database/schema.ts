import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { account, session, user, verification } from "./auth-schema";

const mangaLogs = sqliteTable("manga_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  score: integer("score"),
  status: text("status"),
  volume_progress: integer("volume_progress"),
  chapter_progress: integer("chapter_progress"),
  note: text("note"),
  user_id: text("user_id").references(() => user.id),
});

const guestBook = sqliteTable("guestBook", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  guestBook,
  mangaLogs,
};

export { account, guestBook, mangaLogs, session, user, verification };
