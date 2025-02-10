# --- Stage 1: Base Image (Node.js + Dependencies) ---
FROM oven/bun:latest AS base

WORKDIR /app

# Install dependencies
COPY package*.json bun.lock ./
RUN bun install

# --- Stage 2: Build the App ---
FROM base AS build

WORKDIR /app

# Copy source files
COPY . .

# Build the application
RUN bun run build

# --- Stage 3: Production Image ---
FROM oven/bun:latest AS release

WORKDIR /app

# Copy built files from the 'build' stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/bun.lock ./

RUN bun install --production

# Expose the port your app listens on
EXPOSE 3001

# Command to run the application
CMD ["bun", "run", "start"]