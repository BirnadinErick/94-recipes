# 94Recipes

> Add recipes and have them backed up to the cloud

## Capabilities

- Add new recipes
- edit/delete them
- author recipes as well

## Deployment

Project is in 2 parts.

1. backend
2. frontend

### Backend

1. Copy env file and rename to .env
2. Populate the .env file
3. execute `npm run server` (cwd should be *backend* folder)

### Frontned

Frontend is a static react application bundled by Vite. Deploy
at your heart's content

## Statck

### Backend

- Server: expressjs
- runtime: nodejs (preferrably v18)
- database driver: first-party mongodb nodejs driver
- testing suite: jest

### Frontend

- react
- tailwindcss
- vite + vitest
- redux