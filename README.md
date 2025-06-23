# Taxi Orders Monorepo

This repository contains a simple taxi orders application with a Laravel backend and a React + Typescript frontend.

## Requirements

### Backend
- PHP >= 8.1
- Composer

### Frontend
- Node.js >= 18

## Usage

### Backend
1. Copy example environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Install PHP dependencies and run the app:
   ```bash
   cd backend
   composer install
   php artisan migrate
   php artisan serve --host=127.0.0.1 --port=8000
   ```
   The backend will be available on `http://localhost:8000`.

### Frontend
1. Install npm dependencies and start the dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:3000` and proxy API requests to `http://localhost:8000`.

## Structure
- `backend/` – Laravel application
  - `artisan` – CLI entrypoint
  - `composer.json` – project dependencies
  - `database/migrations/` – example migration for the `orders` table
- `frontend/` – React application powered by **Vite**
  - `index.html` – HTML entry point
  - `package.json` – npm dependencies and scripts
  - `vite.config.ts` – development server configuration

## Migration Example
The migration `database/migrations/2023_01_01_000000_create_orders_table.php` creates the `orders` table with fields for addresses, coordinates, phone number and status.
