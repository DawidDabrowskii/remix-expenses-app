import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css?url";
import { MainLayout } from "~/layout/main.layout";
import { getUserFromSession } from "~/data/auth.server";

export default function MarketingRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserFromSession(request);
  return { user: userId };
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];
