import { Link, useRouteError } from "@remix-run/react";
import Error from "~/components/util/Error";

// This is a catch-all route that will handle 404 errors
export function loader() {
  throw new Response("Not Found", { status: 404 });
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Page Not Found</title>
      </head>
      <body>{children}</body>
    </html>
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
