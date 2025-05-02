# dkbs-rest-api

> A REST API for a Dynamic Knowledge Base System.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/2579984-4788b9ee-f07a-4aa9-bed9-7f1e31fb206d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D2579984-4788b9ee-f07a-4aa9-bed9-7f1e31fb206d%26entityType%3Dcollection%26workspaceId%3D97575bed-61c4-460b-b22c-930ec2a15f87)

## Prerequisites

- Node.js 22.14.0
- Docker 28.1.1 (build 4eba377)
- Docker Compose 2.35.1
- pnpm 10.7.0
- npx 10.9.2


## General setup

Before running the project you will need to do some prep setup.

First, copy the `.env.example` contents into a new `.env` file at the root of the project (there are some default values in there to speed things up).

With that out of the way, it's time to install the dependencies! Just run this at the root of the project:

```bash
pnpm install
```

And then start the DB container:

```bash
docker compose up -d
```

After the DB is initiated, you will need to run it's migrations to create the necessary tables. For that, run:

```bash
pnpm run db-migrate
```

If you want to have some preset data to play around, set `development` as your `NODE_ENV` in your environment file and run:

```bash
pnpm run db-seed
```

If you ever need to restart your DB instance with the default seed data, just run:

```bash
./scripts/restart-db.sh
```

## Running

### with `tsx`

To run in dev mode, execute:

```bash
pnpm run dev
```

A message like `Server running on port 3000 [development mode].` should show after a few seconds. That means that the project is up and running.
