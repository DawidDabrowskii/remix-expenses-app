import { ActionFunctionArgs } from "@remix-run/node";
import { destroySession } from "../data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Response("Invalid request method", { status: 405 });
  }

  return destroySession(request);
}
