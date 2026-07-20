# Rust Player Tracker Plus

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-Private-lightgrey)](#license)

Rust Player Tracker Plus is a full-stack analytics platform for tracking player behavior across Rust servers. It combines BattleMetrics data, a PostgreSQL database, and a modern Next.js dashboard to help server players monitor live activity, build player histories, and surface engagement insights.
<img width="1356" height="473" alt="image" src="https://github.com/user-attachments/assets/7cc211d3-6766-42a9-85bf-27b5a633db4c" />

## Overview

This project is designed for server players who want more than a basic online player list. It tracks servers, stores historical session data, and presents analytics that help answer questions like:

- Which players are most active?
- When is a player usually online?
- How long do sessions last on average?
- Which servers are generating the most tracked activity?

The app includes a dashboard, server management tools, live player lookup, session history, and per-player analytics with charts and forecasts.

## Key Features

- Track Rust servers by BattleMetrics server ID
- Auto-fetch server and player names from the BattleMetrics API
- View live online players for each tracked server
- Add live players to your tracked player list with one click
- Store historical join and leave sessions in PostgreSQL
- Monitor player activity across dashboard, players, sessions, and detail pages
- Generate player analytics such as:
  - last 24h, 7d, and 12-week activity summaries
  - hourly activity heatmaps
  - peak and dead hours
  - average session length
  - recency-weighted online probability forecast
- **Rust+ Companion Integration**:
  - Automated server pairing via FCM (Firebase Cloud Messaging)
  - Persistent credential management (via Desktop/Web tools)
  - Real-time pairing console with live logs and countdown timer
- **Smart In-Game Alerts**:
  - Receive automated Rust+ notifications when tracked players join or leave
  - Per-player toggle for alerts directly in the Player Directory
- Run a background polling worker for continuous updates

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript
- UI: Tailwind CSS 4, shadcn/ui, Lucide React, Sonner
- Backend: Next.js Route Handlers
- Database: PostgreSQL
- ORM: Prisma 7 with `@prisma/adapter-pg`
- Charts: Recharts
- External Data Source: BattleMetrics API
- Containerization: Docker

## Product Areas

### Dashboard

- High-level overview of tracked servers, players, sessions, and worker health
- Quick links into the main operational views

### Servers

- Add servers by BattleMetrics ID
- View tracked player and session counts per server
- Inspect live players currently online
- Track live players directly from the modal

### Rust+ Pairing

- Manual FCM credential configuration (JSON or Command String)
- Integrated Setup Guide for obtaining persistent credentials
- Live pairing listener (2-minute window) to capture server pairing notifications
- Direct integration with BattleMetrics to resolve companion ports to server IDs

### Players

- Search and browse tracked players
- See online/offline status based on recent activity
- **Player Groups**: Organize tracked players into custom, color-coded groups. Display players in modern, collapsible grouped sections for easy monitoring.
- Open an individual player intelligence page
- **In-Game Alert System**: Toggle real-time Rust+ notifications for specific high-priority players, ensuring you never miss a threat or opportunity.

### Player Analytics

- Activity summaries for recent time windows
- Heatmap-style hourly usage patterns
- Recent playtime charts
- Forecast and trend visualization
- Session log for the selected player

### Sessions

- Historical session records
- Active sessions and completed durations
- Filtering by player ID


### Screenshots:
LandingPage
<img width="1300" height="700" alt="image" src="https://github.com/user-attachments/assets/611cac93-a534-4d8a-a64d-53eee47ff7a7" />

Dashboard
<img width="1908" height="969" alt="image" src="https://github.com/user-attachments/assets/2e1ab2c8-2f37-444f-9a2c-c798b06824ba" />


- Servers List (per User)
<img width="984" height="967" alt="image" src="https://github.com/user-attachments/assets/2bb1dd57-5793-4664-983a-009c1258b103" />

Online Players list per server (searchable+ sortable)
<img width="695" height="1130" alt="image" src="https://github.com/user-attachments/assets/f2cab2cf-5c74-4a11-b632-96edb1b62022" />


Tracked Players List with grouping
<img width="1027" height="976" alt="image" src="https://github.com/user-attachments/assets/014afa6e-26f8-463f-9cc8-12df41242aec" />


### Player Page:
player insights page
<img width="972" height="643" alt="image" src="https://github.com/user-attachments/assets/14d6df40-b04f-45bc-ad5d-8ae9c58cba7c" />
forecast and Trends
<img width="1360" height="469" alt="image" src="https://github.com/user-attachments/assets/5d9a7ef6-e9e7-4e5f-81db-e63ff8dc5113" />
Session log 
<img width="1323" height="421" alt="image" src="https://github.com/user-attachments/assets/167f5fbf-9a0a-4f40-8711-d406b74f5b9a" />

### Sessions Page:
<img width="1066" height="681" alt="image" src="https://github.com/user-attachments/assets/e5d79c68-f63a-4885-bd7c-fcd12b87e657" />

## How It Works

1. Servers are added using their BattleMetrics server ID.
2. The app fetches metadata from BattleMetrics and stores tracked servers locally.
3. Live players can be discovered from a server and added to the internal player tracker.
4. A background worker polls BattleMetrics every 60 seconds.
5. When tracked players come online or go offline, sessions are opened and closed in the database.
6. Daily and hourly aggregates are updated when sessions end.
7. Analytics are computed from pre-aggregated data for fast player insights.
8. Rust+ pairing captures server credentials via a temporary FCM listener, allowing for future automated interactions.

## Project Structure

```text
.
|-- prisma/                 # Prisma schema and migrations
|-- public/                 # Static assets
|-- src/
|   |-- app/                # App router pages and API routes
|   |-- components/         # Shared UI components
|   `-- lib/                # Prisma, analytics, worker, utilities
|-- server.ts               # Custom Next.js server + worker bootstrap
|-- Dockerfile              # Containerized runtime
`-- README.md
```

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL database
- Required BattleMetrics API token for all API access (BattleMetrics enforces authorized requests for all endpoints)

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
BATTLEMETRICS_TOKEN=""
PORT=3000
RENDER_EXTERNAL_URL=""
```

### Variable Notes

- `DATABASE_URL`: Required. PostgreSQL connection string used by Prisma.
- `BATTLEMETRICS_TOKEN`: Required. The API key/token for BattleMetrics requests.
- `PORT`: Optional runtime port. Defaults to `3000`.
- `RENDER_EXTERNAL_URL`: Optional production self-ping URL used by the worker on Render.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Prepare the Database

For local development:

```bash
npx prisma db push
```

If you use migrations in your workflow:

```bash
npx prisma migrate dev
```

### 4. Start the App

Standard Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Background Worker

This repository includes a polling worker that tracks live player state and converts it into stored sessions and aggregated analytics.

The worker is started by the custom server in `server.ts`.

To run the app together with the worker locally:

```bash
npx tsx server.ts
```

Important:

- `npm run dev` starts the standard Next.js dev server from `package.json`
- `npx tsx server.ts` starts the custom server and background worker together
- If you want live polling and automatic session updates during development, use the custom server command

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API Overview

Main application routes include:

- `GET /api/servers` - list tracked servers
- `POST /api/servers` - add a server by BattleMetrics ID
- `DELETE /api/servers/:id` - remove a server and related data
- `GET /api/servers/:id/live-players` - fetch current live players from BattleMetrics
- `GET /api/players` - list tracked players with pagination and search
- `POST /api/players/create` - add a player to tracking
- `GET /api/players/:id/analytics` - fetch player analytics and metadata
- `GET /api/sessions` - list historical sessions with filters

## Docker

The project includes a `Dockerfile` that:

- installs dependencies
- generates the Prisma client
- builds the Next.js app
- pushes the schema with `prisma db push`
- starts the custom server with the polling worker

Example:

```bash
docker build -t rust-player-tracker-plus .
docker run --env-file .env -p 3000:3000 rust-player-tracker-plus
```

## Deployment Notes

- The custom server is intended for deployments where the web app and polling worker run in the same process.
- Production polling supports an optional self-ping strategy through `RENDER_EXTERNAL_URL`.
- Ensure your deployment target allows outbound requests to the BattleMetrics API and inbound traffic on the configured `PORT`.

## Suggested Improvements

- Add authentication and role-based access control
- Introduce explicit worker scripts in `package.json`
- Add automated tests for API routes and analytics calculations
- Add export/reporting features for server administrators
- Add richer observability and alerting for worker failures

## License

This repository is currently marked as private. Update this section with your preferred license before publishing publicly.
