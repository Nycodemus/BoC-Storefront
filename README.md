# Blade of Cloth Storefront

## Setup

### Prereqs
 - NVM — Node Version Manager. The repo contains a `.nvmrc` with the appropriate Node version. Run
`nvm install && nvm use` to set up Node / NPM.

### Steps
1. Clone the repository
2. Run `npm i`
3. Prepare backend db:
   1. `cd` to `backend`
   2. Run `npm run script:prepareLocalEnv` to initialize a `.env` with the necessary variables.
   3. Run `npm run db:init` to run all migrations and seed the database
   4. Run `npm run script:genUser -- test@example.com Test password user,admin` to generate a test user.
4. Go back to root directory `cd ..`
5. Run `npm run frontend:serve-dev` to serve the frontend.
6. Run `npm run backend:serve-dev` to serve the backend.
7. Vite should launch the webpage at `http://localhost:5173/`.

Currently, the frontend uses Vite, which includes file watchers. Vite will automatically reload when changes to the
frontend are detected. The backend uses `nodemon` to accomplish the same.

## Applying new DB Migrations

When new DB tables are added, your local dev database may be out of sync.
1. `cd` to `backend`
2. Run `npm run db:init` to apply any new migrations and seeds.
3. If the database is still out of sync, you may need to restore the database from scratch. Delete the .sqlite file and
re-run the above script 
