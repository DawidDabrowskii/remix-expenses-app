import { PrismaClient } from "@prisma/client";

// Add proper typing for the global namespace
declare global {
  // Use 'var' here because that's how global variables work in Node.js
  // This is just a type declaration, not a variable declaration
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

// Use a function to get the client instead of a variable
function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === "production") {
    // In production, always create a new client
    const client = new PrismaClient();
    client.$connect();
    return client;
  } else {
    // In development, reuse the client to avoid too many connections
    if (!global.__db) {
      global.__db = new PrismaClient();
      global.__db.$connect();
    }
    return global.__db;
  }
}

// Export a constant instead of a let variable
export const prisma = getPrismaClient();
