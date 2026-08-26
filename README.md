# TaskFlow

A team-based project & task management API built with **NestJS** — created as a deep-dive learning project to cover the framework end to end: modules, DI, auth, database relations, real-time updates, background jobs, testing, and production readiness.

## ✨ Why this project

TaskFlow isn't just a CRUD app. It's scoped to intentionally touch every major NestJS building block:

- Modular architecture & dependency injection
- Guards, interceptors, pipes, middleware, exception filters
- Authentication (JWT) & role-based authorization
- Relational data modeling (Users, Teams, Projects, Tasks)
- WebSockets for live updates
- Background jobs / queues
- Unit + E2E testing
- API documentation & deployment basics

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | [NestJS](https://nestjs.com/) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | TypeORM (or Prisma — see `docs/decisions.md`) |
| Auth | Passport.js + JWT |
| Queues | BullMQ + Redis |
| Realtime | Socket.IO (via `@nestjs/websockets`) |
| Validation | class-validator / class-transformer |
| Docs | Swagger / OpenAPI |
| Testing | Jest + Supertest |
| Containerization | Docker & Docker Compose |

## 📁 Project Structure

```
taskflow/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/                # env config, validation schema
│   ├── common/                 # shared decorators, filters, interceptors, pipes
│   ├── auth/                   # JWT strategy, guards, login/register
│   ├── users/
│   ├── teams/
│   ├── projects/
│   ├── tasks/
│   ├── notifications/          # queues + events
│   └── websockets/             # realtime gateway
├── test/                       # e2e tests
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🗺️ Domain Model

```
User ──< TeamMembership >── Team ──< Project ──< Task >── User (assignee)
```

- A **User** can belong to multiple **Teams**
- A **Team** owns multiple **Projects**
- A **Project** contains multiple **Tasks**
- A **Task** is assigned to a **User** and has a status (`todo`, `in_progress`, `done`)

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- Docker & Docker Compose
- pnpm / npm / yarn

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd taskflow
npm install

# 2. Environment variables
cp .env.example .env
# fill in DB, JWT, Redis values

# 3. Start infrastructure (Postgres + Redis)
docker-compose up -d

# 4. Run migrations
npm run migration:run

# 5. Start the app
npm run start:dev
```

App runs at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api`

## 🧪 Testing

```bash
npm run test         # unit tests
npm run test:e2e     # end-to-end tests
npm run test:cov     # coverage report
```

## 📚 Learning Roadmap

This project is built in phases — each phase maps to a NestJS concept area. See [`docs/roadmap.md`](docs/roadmap.md) for the full breakdown.

| Phase | Focus |
|---|---|
| 1 | Modules, controllers, providers, DI, DTOs |
| 2 | Database layer, entities, relations, migrations |
| 3 | Auth (JWT), guards, RBAC, rate limiting |
| 4 | Pipes, interceptors, filters, middleware, dynamic modules |
| 5 | WebSockets, queues, event-driven patterns |
| 6 | Unit & E2E testing |
| 7 | Swagger, health checks, Docker, logging |

## 🔑 Key Endpoints (WIP)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Get JWT access/refresh tokens |
| GET | `/teams` | List teams for current user |
| POST | `/teams/:id/projects` | Create a project in a team |
| GET | `/projects/:id/tasks` | List tasks in a project |
| PATCH | `/tasks/:id` | Update task status/assignee |
| WS | `/ws/tasks` | Subscribe to live task updates |

## 📦 Scripts

```bash
npm run start:dev       # dev server with watch mode
npm run build            # production build
npm run lint              # eslint
npm run format            # prettier
npm run migration:generate
npm run migration:run
```

## 🐳 Docker

```bash
docker-compose up --build
```

Spins up the API, PostgreSQL, and Redis together.

## 📄 License

MIT — this is a learning project, free to fork and adapt.
