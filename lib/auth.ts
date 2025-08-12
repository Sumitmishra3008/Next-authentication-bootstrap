import db from "@/lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { generateSessionToken } from "@/lib/utils";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const adapter = PrismaAdapter(db);

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "Sumit",
          required: true,
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
          required: true,
        },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // In a real app, you'd verify the password here
        // For demo purposes, we'll create/find a user
        try {
          let user = await db.user.findUnique({
            where: { email: credentials.username },
          });
          if (user) {
            const password = credentials.password;
            const passwordHash: string = user.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const isValidPassword = await bcrypt.compare(
              password,
              passwordHash
            );
            if (!isValidPassword) return null;
          }
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          if (!user) {
            user = await db.user.create({
              data: {
                email: credentials.username,
                name: "Demo User",
                // In real app, hash the password
                password: hashedPassword,
              },
            });
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
};
