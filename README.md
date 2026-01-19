# My Daily Goals

A minimalist PWA for tracking daily goals with offline support.

## Features

- **Daily Goal Tracking**: Add goals and mark them complete
- **Two Goal Types**:
  - **One-time**: Disappears immediately when completed
  - **Repeated**: Resets daily, track the same goal every day
- **History View**: Navigate to past days to see what you accomplished (read-only)
- **Statistics**: View completion rates across different time periods (monthly, quarterly, semi-annual, annual)
- **Offline Support**: Works without internet using IndexedDB
- **Dark Mode**: Toggle between light and dark themes
- **PWA**: Install on mobile or desktop

## Tech Stack

- Next.js 16 with Turbopack
- React 19
- TypeScript
- Tailwind CSS v4
- IndexedDB (via idb)
- Recharts for statistics
- Serwist for service worker/PWA

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── page.tsx                 # Home page (goals list)
├── stats/page.tsx           # Statistics page
├── components/
│   ├── goals/               # Goal-related components
│   ├── stats/               # Statistics components
│   ├── navigation/          # Bottom navigation
│   └── ui/                  # Reusable UI components
├── hooks/
│   ├── useDB.ts             # IndexedDB connection
│   ├── useGoals.ts          # Goals CRUD operations
│   └── useStats.ts          # Statistics computation
└── lib/db/
    ├── index.ts             # Database operations
    ├── types.ts             # TypeScript interfaces
    ├── utils.ts             # Date utilities
    └── stats.ts             # Stats queries
```

## Data Model

**Goals** are stored in IndexedDB with:
- `id`: Unique identifier
- `title`: Goal text
- `type`: "one-time" or "repeated"
- `createdAt`: Creation timestamp
- `isArchived`: Soft delete flag

**Completions** track when goals are marked done:
- `id`: `${goalId}_${date}`
- `goalId`: Reference to goal
- `date`: YYYY-MM-DD format
- `completedAt`: Completion timestamp

## Key Behaviors

- Only today's goals can be checked/unchecked
- One-time goals stay visible until end of day, then disappear
- Repeated goals reset to unchecked each new day
- Past days are viewable but read-only

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/calebemachado/my-daily-goals-pwa/issues/new) on GitHub.
