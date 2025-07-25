PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_manga_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`score` integer,
	`is_completed` integer DEFAULT false NOT NULL,
	`volume_progress` integer,
	`chapter_progress` integer,
	`note` text,
	`user_id` text,
	`created_at` text,
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_manga_logs`("id", "title", "score", "is_completed", "volume_progress", "chapter_progress", "note", "user_id", "created_at", "updated_at") SELECT "id", "title", "score", "is_completed", "volume_progress", "chapter_progress", "note", "user_id", "created_at", "updated_at" FROM `manga_logs`;--> statement-breakpoint
DROP TABLE `manga_logs`;--> statement-breakpoint
ALTER TABLE `__new_manga_logs` RENAME TO `manga_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;