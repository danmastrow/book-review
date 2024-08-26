# Book review
[Live deployment on Vercel](https://book-review-sage.vercel.app)

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


## Getting Started

```bash
yarn install
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

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