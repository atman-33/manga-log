# manga-log Domain Model

## Core Entity: Manga Log
Each manga log entry represents a user's reading progress for a specific manga series.

### Required Fields
- **title**: The title of the manga (text, required)
- **userId**: Foreign key to the user who created the log (required)

### Optional Fields
- **score**: User-assigned score from 1.0 to 5.0 (numeric, optional)
- **isCompleted**: Flag indicating if the manga series is completed or ongoing (boolean)
- **progressVolume**: Last volume number the user has read (integer, optional)
- **progressChapter**: Last chapter number the user has read (integer, optional)
- **note**: Free-form text area for personal notes (text, optional)

### System Fields
- **id**: Primary key
- **createdAt**: Timestamp when log was created
- **updatedAt**: Timestamp when log was last modified

## Database Schema Example
```typescript
export const mangaLogs = sqliteTable('manga_logs', {
  id: integer('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  score: real('score'), // 1.0 to 5.0
  isCompleted: integer('is_completed', { mode: 'boolean' }),
  progressVolume: integer('progress_volume'),
  progressChapter: integer('progress_chapter'),
  note: text('note'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
```

## Business Rules
- Users can only access their own manga logs
- Title is the only required field besides user association
- Score must be between 1.0 and 5.0 if provided
- Progress fields should be positive integers if provided
- Each user can have multiple logs for the same manga title (re-reads)