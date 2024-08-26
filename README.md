# Book review
[Live deployment on Vercel](https://book-review-sage.vercel.app)

## Getting Started

Copy the `.env.example` to `.env` and populate with your Postgres db connection details etc.
```bash
// .env file
POSTGRES_PRISMA_URL="postgres://default:{{password}}@{{host}}/{{databaseName}}?pgbouncer=true&connect_timeout=15&sslmode=require"
```

```bash
yarn install
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

This project uses Prisma for database management. To manage your database schema and run migrations, follow these steps:

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

For more information on Prisma migrations, visit the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate).

## Notes:
- Tech Stack
    - Next.js for frontend and API
    - Cypress for e2e and api tests
    - Tailwind CSS for styling
    - Tailwind UI components for UX
    - Eslint for linting
    - Prisma for db migrations and ORM 
- Using vercel for deployment and hosting of Next.js app
- Postgres db setup and hosted by Vercel

## TODO
- [x] Initialize repo + deployment to vercel
- [ ] Setup postgres db and connection
- [ ] Setup cypress e2e + api tests
- [ ] Design initial schema
- [ ] Design intial UX

## Out of scope
- [x] Add custom domain
- [x] Setup git hooks
- [x] User Authentication (will just mock anything representing a user for now)
- [x] Logging/Alerting on errors (easy to setup in Vercel, or other cloud providers)
- [x] User analytics, etc. PostHog, Google Analytics
- [x] Multiple environment setup and infrastructure as code (etc. Terraform)
- [x] CI/CD running tests, validation


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
- Architecture Requirements:
- Implement error handling and display user-friendly error messages
- Ensure type safety across the stack using TypeScript


### API Tests:
- Test that a book can be successfully created

### Deliverables:

Push your changes to a public repository and share the link via email
Include documentation on setting up and running your solution
