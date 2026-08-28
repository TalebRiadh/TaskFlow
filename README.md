# TaskFlow

A team-based project & task management API built with **NestJS** — a deep-dive learning project covering the framework end to end: modules, DI, hexagonal architecture, database, migrations, testing, and production readiness.

## 📍 Current status

Implemented:
- **Users module** in **hexagonal (ports & adapters) architecture** (`domain` / `application` / `infrastructure`)
- TypeORM integration with PostgreSQL + SQL migrations
- Validation (class-validator) + env validation (Joi)
- bcrypt password hashing, UUID ids, conflict detection on duplicate emails

Planned (see roadmap below): auth (JWT), teams, projects, tasks, WebSockets, queues, Swagger.

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | [NestJS](https://nestjs.com/) 11 |
| Language | TypeScript |
| Database | PostgreSQL 16 (Docker) |
| ORM | TypeORM 1.x |
| Validation | class-validator / class-transformer |
| Env config | @nestjs/config + Joi |
| Password hashing | bcrypt |
| Testing | Jest + Supertest |
| Containerization | Docker & Docker Compose (infra) |

*Planned:* Passport.js + JWT, BullMQ + Redis, Socket.IO, Swagger/OpenAPI, health checks.

## 📁 Project Structure

```
taskflow/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/                # env validation schema (Joi)
│   └── users/
│       ├── domain/            # entity, repository port (USER_REPOSITORY)
│       ├── application/       # use cases + DTOs (CreateUser, FindUser)
│       └── infrastructure/
│           ├── http/          # UsersController
│           └── persistence/   # TypeORM entity + adapter
│               #    ^ (user.orm-entity.ts, typeorm-user.repository.ts)
├── migrations/                # SQL migrations (TypeORM)
├── test/                      # e2e tests
├── data-source.ts             # TypeORM CLI data source
├── docker-compose.yml         # Postgres + Redis only
├── .env.example
└── README.md
```

## 🗺️ Domain Model

Currently modeled: **User** (`id`, `email`, `name`, `hashedPassword`, `createdAt`).

Planned model:

```
User ──< TeamMembership >── Team ──< Project ──< Task >── User (assignee)
```

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- Docker & Docker Compose
- npm / pnpm / yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Environment variables
cp .env.example .env     # Windows: Copy-Item .env.example .env
# fill in DATABASE_URL (Docker defaults already match .env.example)

# 3. Start infrastructure (Postgres + Redis)
docker-compose up -d

# 4. Create the database schema (migrations)
npm run migration:run

# 5. Start the app
npm run start:dev
```

App runs at `http://localhost:3000`

## 🔑 Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/` | Health check ("Hello World!") | ✅ |
| POST | `/users` | Create a user (email, name, password) | ✅ |
| GET | `/users/:id` | Get a user by id | ✅ |
| POST | `/auth/register` | Register (JWT) | 🚧 planned |
| POST | `/auth/login` | Login (JWT) | 🚧 planned |
| GET | `/teams` | List teams | 🚧 planned |
| WS | `/ws/tasks` | Live task updates | 🚧 planned |

## 📦 Scripts

```bash
npm run start:dev            # dev server with watch mode
npm run start:prod           # run the production build (dist/src/main)
npm run build                # production build
npm run lint                 # eslint
npm run format               # prettier
npm run test                 # unit tests
npm run test:cov             # coverage report
npm run test:e2e             # e2e tests (requires Postgres running)
npm run typeorm              # typeorm CLI wrapper (-d data-source.ts)
npm run migration:create     # scaffold a new (empty) migration
npm run migration:generate   # generate a migration from entity changes
npm run migration:run        # apply pending migrations
npm run migration:revert     # revert the last migration
```

## 🧪 Testing

```bash
npm run test         # unit tests
npm run test:cov     # coverage report
npm run test:e2e     # e2e tests (requires Postgres running)
```

## 🐳 Docker

`docker-compose.yml` manages the **infrastructure only** — the API runs locally via npm.

| Service | Image | Port | Credentials (dev) |
|---|---|---|---|
| postgres | `postgres:16-alpine` | `5432` | `postgres` / `postgres` / db `taskflow` |
| redis | `redis:7-alpine` | `6379` | — |

```bash
docker-compose up -d        # start Postgres + Redis
docker-compose down         # stop containers (keeps volumes)
docker-compose down -v      # stop and wipe data volumes
```

## 📚 Learning Roadmap

| Phase | Focus | Status |
|---|---|---|
| 1 | Modules, controllers, providers, DI, DTOs | ✅ |
| 2 | Database layer, entities, relations, migrations | ✅ (Users) |
| 3 | Auth (JWT), guards, RBAC, rate limiting | 🚧 |
| 4 | Pipes, interceptors, filters, middleware, dynamic modules | 🚧 |
| 5 | WebSockets, queues, event-driven patterns | 🚧 |
| 6 | Unit & E2E testing | 🔶 |
| 7 | Swagger, health checks, Docker, logging | 🚧 |

## 📄 License

MIT — this is a learning project, free to fork and adapt.