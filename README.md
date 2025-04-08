# PxlHut Task

## Frontend

This is the frontend part of the PxlHut task. It is a Nextjs15 application that uses the following technologies:

- React
- Nextjs
- Tailwind CSS
- TypeScript
- Redux
- Redux Toolkit
- React Query
- React Hook Form
- Zod
- React Icons

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

1. Clone the repository:

   ```bash
   git clone https://github.com/monir6163/pxlhut-task-frontend.git
   cd pxlhut-task-frontend
   ```

1. Install dependencies:
   ```bash
    npm install
   ```
1. Run the development server:

   ```bash
   npm run dev

   # Open http://localhost:3000 to view it in the browser.
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
Check the `.env.example` file for reference.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=""
NEXT_PUBLIC_STRIPE_SECRET_KEY=""
```
