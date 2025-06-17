# Blade of Cloth Storefront

## Setup

### Prereqs
 - NVM — Node Version Manager. The repo contains a `.nvmrc` with the appropriate Node version. Run `nvm install && nvm use` to set up Node / NPM.

### Steps
1. Clone the repository
2. Run `npm i`
3. Prepare backend db:
   1. `cd` to `backend`
   2. Copy the `.example_env` file to `.env`
   3. Run `npm db:init`. This runs all migrations and seeds the database
4. Go back to root directory `cd ..`
5. Run `npm run frontend:serve-dev` to serve the frontend.
6. Run `npm run backend:serve-dev` to serve the backend.
7. Vite should launch the webpage at `http://localhost:5173/`.

Currently, the frontend uses Vite, which includes file watchers. Vite will automatically
reload when changes to the frontend are detected. The backend uses nodemon to accomplish the same.
