docker compose down -v --rmi local && \
docker compose up -d && \
sleep 1 && \
pnpm run db-migrate && \
pnpm run db-seed