import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { account, session, user, verification } from './auth-schema';

const mangaLogs = sqliteTable('manga_logs', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  score: real('score'),
  is_completed: integer('is_completed', { mode: 'boolean' })
    .notNull()
    .default(false),
  volume_progress: integer('volume_progress'),
  chapter_progress: real('chapter_progress'),
  note: text('note'),
  thumbnail: text('thumbnail'), // Google Books API thumbnail URL
  user_id: text('user_id').references(() => user.id),
  created_at: text('created_at'),
  updated_at: text('updated_at'),
});

const guestBook = sqliteTable('guestBook', {
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
