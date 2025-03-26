import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import sharedStyles from "~/styles/shared.css?url";
import Error from "~/components/util/Error";
import { getUserFromSession } from "~/data/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserFromSession(request);
  console.log("Root loader - userId:", userId);
  return { user: userId };
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as
    | Error
    | { status: number; statusText: string; data?: { message: string } };

  let title = "An error occurred!";
  let message = "An unknown error occurred!";

  if ("status" in error) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message || "Something went wrong!";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Document>
      <main>
        <Error title={title}>
          <p>{message}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: sharedStyles },
];
