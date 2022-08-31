import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import ws from "ws";
import EventEmitter from "events";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

const ee = new EventEmitter();

export const createContext = async ({
  req,
  res,
}:
  | trpcNext.CreateNextContextOptions
  | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  const session = await getSession({ req });

  return {
    req,
    res,
    prisma,
    session,
    ee,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
