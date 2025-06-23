# Taxi Orders Monorepo

This repository contains a simple taxi orders application with a Laravel backend and a React + Typescript frontend. The services are orchestrated with `docker-compose`.

## Requirements
- Docker
- docker-compose

## Usage

1. Copy example environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Build and start the services:
   ```bash
   docker-compose up --build
   ```
3. Backend will be available on `http://localhost:8000`, frontend on `http://localhost:3000`.

The frontend communicates with the backend via `http://backend:8000/api` inside the Docker network.

## Structure
- `backend/` – Laravel application
  - `Dockerfile` – builds the PHP-FPM container
  - `composer.json` – project dependencies
  - `database/migrations/` – includes an example migration for the `orders` table
 - `frontend/` – React application powered by **Vite**
  - `Dockerfile` – dev server image
  - `package.json` – npm dependencies and scripts

## Migration Example
The migration `database/migrations/2023_01_01_000000_create_orders_table.php` creates the `orders` table with fields for addresses, coordinates, phone number and status.
