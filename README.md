# dkbs-rest-api

> A simple chat-room project to study web sockets.


## Prerequisites

- Node.js 22.14.0
- Docker 28.1.1 (build 4eba377)
- Docker Compose 2.35.1
- pnpm 10.7.0


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


## Running

### with `tsx`

To run in dev mode, execute:

```bash
pnpm run dev
```

A message like `Server running on port 3000 [development mode].` should show after a few seconds. That means that the project is up and running.

### with compiled files

To run it without `tsx` you will need to build the project first:

```bash
pnpm run build
```

And then run it with:

```bash
pnpm run start
```

A message like `Server running on port 3000 [development mode].` should show after a few seconds. That means that the project is up and running.
