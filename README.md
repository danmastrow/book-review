# Book review
[Live deployment on Vercel](https://book-review-sage.vercel.app)

## Getting Started

Copy the `.env.example` to `.env` and populate with your Postgres db connection details etc.
```bash
# .env file
POSTGRES_PRISMA_URL="postgres://default:{{password}}@{{host}}/{{databaseName}}?pgbouncer=true&connect_timeout=15&sslmode=require"
```

```bash
yarn install
```

```bash
yarn dev
```

For unit tests (Vitest)
```bash
yarn test
```

To setup and run playwright e2e and api tests
```bash
# ensure your .e2e.env is pointing to the correct environment
yarn test:e2e:install # This only needs to be run once
yarn test:e2e:ui
# or for CLI only
yarn test:e2e
```

## Database Migrations

This project uses Prisma for database management.

1. Make changes to your database schema in the `prisma/schema.prisma` file.

2. Generate a new migration by running:
   ```
   npx prisma migrate dev --name <migration-name>
   ```
   Replace `<migration-name>` with a descriptive name for your migration, e.g., `add_user_email`.

3. Review the generated migration in the `prisma/migrations` folder.

4. Apply the migration to your database:
   ```
   npx prisma migrate deploy
   ```

5. After applying migrations, generate the updated Prisma Client:
   ```
   npx prisma generate
   ```

6. For local development run the seed script to add some demo data.
   ```
   yarn seed
   ```

For more information on Prisma migrations, visit the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate).

## Notes:
- Tech Stack
    - Next.js for frontend and API
    - Playwright for e2e and api tests
    - Vitest for unit testing
    - Tailwind CSS for styling
    - Tailwind UI components for UX
    - Eslint for linting
    - Prisma for db migrations and ORM 
- Using vercel for deployment and hosting of Next.js app
- Postgres db setup and hosted by Vercel
- Unit testing server components avoided -> https://nextjs.org/docs/app/building-your-application/testing#async-server-components

## TODO
- [x] Initialize repo + deployment to vercel
- [x] Setup postgres db and connection
- [x] Setup Playwright e2e + api tests
- [x] Design initial schema
- [x] Design intial UX and APIs needed
- [x] Implement view Books display
- [x] Setup unit testing
- [x] Error handling when serverside data fails to load
- [x] E2E test for homepage with books
- [x] Implement view Book display with reviews visible
- [ ] Implement adding a book 
   - Validate book name and author aren't empty.
   - Return user friendly error messages
- [x] Implement adding review/rating
   - [x] Ensure a user can only review a book once
   - [x] Validate that the review text is not empty and the rating is between 1 and 5
   - [x] Return user friendly error messages
- [ ] Ensure readme is updated, images, notes, todos local dev etc
- [ ] Record loom and send off

## Out of scope
- [x] Add custom domain
- [x] Setup git hooks
- [x] Local development Postgres SQL server setup (dockerized)
- [x] User Authentication (will just mock anything representing a user for now)
- [x] Logging/Alerting on errors (easy to setup in Vercel, or other cloud providers)
- [x] User analytics, etc. PostHog, Google Analytics
- [x] Multiple environment setup and infrastructure as code (etc. Terraform)
- [x] CI/CD running tests, validation
- [x] Favicons, branding etc.
- [x] Book API data, etc. Google books, or book images.
- [x] Pagination or search, currently restricted to displaying 10 latest books.
- [x] Adding a book slug for the url, instead of just /{id}
- [x] Using a proper form/validation library for UI validation. etc react hook form.
- [x] Localization


## Initial specification
Create a small web application with the following components:

- React frontend
- Node backend
- PostgreSQL database

## System Requirements:

### Features

- A form to submit a new book
- A form to submit a review for a book
- Display a list of books
- Display reviews for each book

### Functional Requirements:

- Validate that the review text is not empty and the rating is between 1 and 5
- Ensure a user can only review a book once

### Architecture Requirements:
- Implement error handling and display user-friendly error messages
- Ensure type safety across the stack using TypeScript


### API Tests:
- Test that a book can be successfully created

### Deliverables:

Push your changes to a public repository and share the link via email
Include documentation on setting up and running your solution
