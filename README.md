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
- pnpm or yarn

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```
   
2. Approve all required builds:
   ```bash
   pnpm approve-builds
   ```

3. Copy the example environment file and configure your environment variables:
   ```bash
   cp .env.example .env
   # Then edit .env to set the required values
   ```
   
4. Run database migrations:
   ```bash
   pnpm run db:push
   ```

5. Run the development server:
   ```bash
   pnpm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run db:generate` - Generate database migrations
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open Drizzle Studio

## Database Setup

The database schemas can be defined in `lib/db/schema`.

After updating schema:
```bash
pnpm run db:generate  # Generate migrations
pnpm run db:migrate  # Apply migrations
```

## Authentication

BetterAuth is configured with email/password authentication.

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
