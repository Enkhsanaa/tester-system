import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  login: protectedProcedure
    .input(
      z
        .object({ email: z.string().nullish(), password: z.string().nullish() })
        .nullish()
    )
    .query(() => {
      return "Logging in!";
    }),
});
