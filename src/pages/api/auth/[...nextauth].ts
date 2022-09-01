import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";


// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Vk from "./Vk";

const prisma = new PrismaClient();


export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        session.user.level = user.level;
        session.user.isConfirmed = user.isConfirmed
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: "71368b02fd7a5d4f93a2",
      clientSecret: "79f8294473e6e2174b0ba906517c06565efb21b7",
    }),
    Vk({
      clientId: process.env.VK_ID ?? '',
      clientSecret: process.env.VK_SECRET ?? '',
    }),
  ],
};

export default NextAuth(authOptions);
