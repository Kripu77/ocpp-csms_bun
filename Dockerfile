FROM --platform=linux/amd64 oven/bun:1 as base
COPY package.json package.json
RUN bun install
COPY . .
RUN bun install typescript
RUN bun run build
EXPOSE 3001
CMD [ "bun", "index.ts" ]
