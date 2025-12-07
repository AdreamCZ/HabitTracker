# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Database**: SQLite with libsql client (Turso)
- **ORM**: Drizzle ORM
- **Authentication**: BetterAuth (email/password)
- **Data Fetching**: TanStack Query v5
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Package Manager**: pnpm

## Development Commands

```bash
# Development
pnpm dev              # Start dev server on localhost:3000
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues

# Database
pnpm db:generate      # Generate migrations from schema
pnpm db:migrate       # Apply migrations
pnpm db:push          # Push schema directly (dev only)
pnpm db:studio        # Open Drizzle Studio
```

## Architecture

### Route Structure

The app uses Next.js App Router with route groups for organization:

- `app/(auth)/` - Unauthenticated routes (login, register)
- `app/(navbar)/` - Authenticated routes with navbar layout
  - `(checkin)/checkin` - Daily habit check-in interface
  - `(dashboard)/dashboard` - User dashboard
  - `(settings)/settings` - User and habit management
- `app/api/auth/[...all]/` - BetterAuth API routes

Route groups `(auth)` and `(navbar)` don't affect the URL structure but allow separate layouts.

### Database Schema

Core entities in `lib/db/schema/schema.ts`:

- **user** - From BetterAuth (auth-schema.ts)
- **habit** - Global habit templates (e.g., "Exercise", "Read")
- **userHabit** - User's instance of a habit with tracking data (streak, daysCompleted, lastCompleted)
- **badge** - Achievements unlocked at streak milestones

**Important**: When adding new badges, the icon must also be added to the icon map in `components/misc/badgeIcon.tsx`.

### Server Actions Pattern

Server actions are organized in `app/modules/` by entity:

- `app/modules/habit/actions.ts` - Global habit operations
- `app/modules/userHabit/actions.ts` - User habit CRUD and check-in logic
- `app/modules/badge/actions.ts` - Badge queries
- `app/modules/user/actions.ts` - User profile operations

All actions return `{ success: boolean; data?: T; error?: string }` pattern.

### Authentication Flow

- BetterAuth configured in `lib/auth/index.ts` with Drizzle adapter
- Session helper: `getSession()` from `lib/auth/session.ts` (uses Next.js headers)
- Client-side auth: `lib/auth/client.ts` exports authClient for client components
- Email verification is disabled (`requireEmailVerification: false`)

### Database Connection

- Uses `@libsql/client` for Turso/SQLite connection
- Connection configured in `lib/db/index.ts`
- Requires `DATABASE_URL` and optionally `DATABASE_AUTH_TOKEN` env vars
- Schema location: `lib/db/schema/` (configured in drizzle.config.ts)

### State Management

- TanStack Query for server state (configured in `lib/query/`)
- QueryProvider wraps app in root layout
- React Query DevTools enabled in development

### Component Organization

- **Route-specific components**: Colocated in route directories (e.g., `app/(navbar)/(checkin)/checkin/habit-card.tsx`)
- **Shared settings components**: `app/(navbar)/(settings)/components/`
- **UI primitives**: `components/ui/` (shadcn components)
- **Module actions**: `app/modules/` (server actions by entity)

### Check-in Logic

The check-in system (`checkInHabit` in userHabit/actions.ts):
- Prevents duplicate check-ins on the same day (timezone-normalized)
- Increments streak if checked in on consecutive days
- Resets streak to 1 if gap detected
- Stores previous completion date for undo functionality (`previousLastCompleted`)

## Environment Variables

Required variables (see `.env.example`):

```bash
DATABASE_URL              # SQLite file path or Turso URL
DATABASE_AUTH_TOKEN       # Optional for local, required for Turso
BETTER_AUTH_SECRET        # Generate with: openssl rand -base64 32
BETTER_AUTH_URL           # Base URL for auth
NEXT_PUBLIC_BETTER_AUTH_URL
```

## Database Workflow

1. Modify schema in `lib/db/schema/schema.ts`
2. For development: `pnpm db:push` (direct schema sync)
3. For production: `pnpm db:generate` then `pnpm db:migrate`

Note: The codebase has an index definition commented out due to migration issues. Avoid adding indexes during rapid iteration.

## Code Style

- ESLint configured with TypeScript, React, and Prettier plugins
- Prettier with Tailwind plugin for class sorting
- Prefer arrow functions (enforced by eslint-plugin-prefer-arrow)