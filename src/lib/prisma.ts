/**
 * Prisma Client Singleton
 *
 * Prevents multiple PrismaClient instances from being created during
 * Next.js hot-reloads in development. In production, a single instance
 * is always created per serverless function invocation.
 *
 * DATABASE_URL points to Supabase Transaction Pooler (port 6543)
 * for serverless-safe connection management.
 */
import { PrismaClient } from "@/generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
