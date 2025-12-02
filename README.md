# HabitTracker

A modern habit tracking application built with Next.js, TypeScript, and a powerful tech stack.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Drizzle ORM
- **Authentication**: BetterAuth (Email/Password)
- **Data Fetching**: Tanstack Query v5
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/auth/          # Auth API endpoints
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn components
├── lib/                  # Core utilities
│   ├── auth/            # BetterAuth configuration
│   ├── db/              # Drizzle database setup
│   ├── query/           # Tanstack Query setup
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
└── drizzle/            # Database migrations
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment variables are already set up in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## Database Setup

The database schema is intentionally left empty in `lib/db/schema.ts`. Define your habit tracking schema there using Drizzle ORM.

Example:
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const habits = sqliteTable('habits', {
  id: integer('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
```

After defining your schema:
```bash
npm run db:generate  # Generate migrations
npm run db:push      # Apply to database
```

## Authentication

BetterAuth is configured with email/password authentication. The auth tables will be automatically created when you first use the authentication system.

- **Login**: `/login`
- **Register**: `/register`
- **Dashboard**: `/dashboard` (protected route)

## Features

- Email/password authentication
- Protected routes with middleware
- Tanstack Query for server state management
- Responsive UI with Tailwind CSS
- Type-safe database queries with Drizzle
- shadcn/ui components

## Next Steps

1. Define your database schema in `lib/db/schema.ts`
2. Create habit tracking components
3. Build out the dashboard functionality
4. Add API routes for habit CRUD operations
