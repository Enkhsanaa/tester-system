# Tester system

A NextJs fullstack app for educational purposes. 

#### Technologies: ReactJs, PostgreSQL, Prisma, DaisyUI (TailwindCSS), tRPC

# Prerequisites

- PostgreSQL instance
- Node LTS

# How to run

## 1. Install dependencies
```
npm install
```

## 2. Setup env variables

Edit the `.env` file to set app secrets accordingly. (eg. DATABASE_URL=postgresql://...)

## 3. Migrate the schema to the database instance

Creates tables defined in the `prisma/schema.prisma` on the database. This step has to be done only once in the beginning and everytime the schema file gets udpated.

```
npm run syncDb
```

## 4. Run development instance

```
npm run dev
```

The website will run on `localhost:3000` by default.


# Bootstrapped by

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Tech sources

- [Prisma](https://prisma.io)
- [DaisyUI](https://daisyui.com)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)


Also checkout these awesome tutorials on `create-t3-app`.

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)

## How do I deploy this?

Follow our deployment guides for [Vercel](https://beta.create.t3.gg/en/deployment/vercel) and [Docker](https://beta.create.t3.gg/en/deployment/docker) for more information.
