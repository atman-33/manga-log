# Project Overview

This is **manga-log**, a React Router v7 + Cloudflare full-stack application for tracking manga reading progress.

## Application Purpose
- **Objective**: Web application for users to log and track manga they have read
- **Target Audience**: English-speaking users (all UI in English)
- **Core Functionality**: Personal manga library with reading progress tracking

## Tech Stack
- **Frontend**: React 19, React Router v7 with SSR
- **Backend**: Cloudflare Workers, Pages, D1 Database
- **Database**: Drizzle ORM with SQLite (D1)
- **Authentication**: better-auth with Google OAuth
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Build Tools**: Vite, TypeScript
- **Code Quality**: Biome (linting/formatting), Vitest (testing)

## Core Features
- **User Authentication**: Google OAuth login/logout
- **Manga Logging**: Add, edit, delete manga entries
- **Progress Tracking**: Volume/chapter progress, completion status
- **Search & Sort**: Filter by title, sort by date/score/title
- **Personal Notes**: Free-form text notes for each manga

## Architecture Patterns
- File-based routing with React Router v7
- Server-side rendering (SSR) enabled
- Edge-first deployment on Cloudflare
- Type-safe database operations with Drizzle ORM
- Component-driven UI with shadcn/ui
- Responsive design for mobile and desktop

## Key Directories
- `app/`: Main application code (routes, components, utilities)
- `database/`: Database schema and migrations
- `workers/`: Cloudflare Workers code
- `public/`: Static assets
- `test/`: Test files

## Development Workflow
- Use `npm run dev` for local development
- Use `npm run check` for type checking and linting
- Use `npm run db:migrate` for database changes
- Use `npm run deploy` for production deployment