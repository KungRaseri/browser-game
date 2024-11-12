# Uncharted Lands | Browser-based Settlement game

## Quality
[![Uncharted Lands - CI](https://github.com/RedSyndicate/browser-game/actions/workflows/CI.yml/badge.svg)](https://github.com/RedSyndicate/browser-game/actions/workflows/CI.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RedSyndicate_browser-game&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=RedSyndicate_browser-game) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=RedSyndicate_browser-game&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=RedSyndicate_browser-game) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=RedSyndicate_browser-game&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=RedSyndicate_browser-game)

## Technology Stack
### Frontend
* Sveltekit
    * Typescript
    * Skeleton UI
    * Tailwind CSS
    * Vitest
    * Playwright
### Backend
* Prisma DB
* PostgreSQL

## Database
```bash
# generate the typescript client
npx prisma generate

# run migration scripts against dev environment
npx prisma migrate dev

# push the schema to the database
npx prisma db push
```
## Developing
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn` or `bun install`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
