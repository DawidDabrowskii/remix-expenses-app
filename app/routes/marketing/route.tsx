import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css?url";
import { MainLayout } from "~/layout/main.layout";

export default function MarketingRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];
