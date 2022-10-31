import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session({ session, user }) {
      console.log("❌ session", session, user);
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "E-Mail",
          type: "text",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          // If no error and we have user data, return it
          if (
            user?.password &&
            credentials?.password &&
            user?.password === credentials?.password
          ) {
            return user;
          } else {
            // Create user if not found; Used for creating the initial user manually
            // const dummyUser = await prisma.user.create({
            //   data: {
            //     email: credentials?.email,
            //     emailVerified: new Date(),
            //     image: "https://unsplash.it/100/100",
            //     password: credentials?.password,
            //     name: "Dummy user",
            //   },
            // });
            // const dummyAccount = await prisma.account.create({
            //   data: {
            //     provider: "customProvider",
            //     providerAccountId: dummyUser.id,
            //     type: "student",
            //     scope: "list-tests schedule-tests",
            //     userId: dummyUser.id,
            //   },
            // });
            // return dummyAccount;
          }
        } catch (err) {
          console.log("caught error", err);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
