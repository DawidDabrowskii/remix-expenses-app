import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  const cookie = await sessionStorage.commitSession(session);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
    path: "/",
    name: "expenses_session",
  },
});

type AuthData = {
  email: string;
  password: string;
};

type AuthResponse =
  | {
      error?: {
        message: string;
        status: number;
      };
    }
  | Response;

export async function signup({
  email,
  password,
}: AuthData): Promise<AuthResponse> {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return {
      error: {
        message: "A user with the provided email address exists already.",
        status: 422,
      },
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  return createUserSession(user.id, "/expenses");
}

export async function login({
  email,
  password,
}: AuthData): Promise<AuthResponse> {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (!existingUser) {
    return {
      error: { message: "Invalid credentials", status: 401 },
    };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordsMatch) {
    return {
      error: { message: "Invalid credentials", status: 401 },
    };
  }

  return createUserSession(existingUser.id, "/expenses");
}

export async function getUserFromSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");

  const session = await sessionStorage.getSession(cookieHeader);
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroySession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const sessionCookie = await sessionStorage.destroySession(session);

  return redirect("/", {
    headers: { "Set-Cookie": sessionCookie },
  });
}
