import { LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { MainLayout } from "~/layout/main.layout";

export function AuthPage() {
  return (
    <MainLayout>
      <AuthForm />
    </MainLayout>
  );
}

export default AuthPage;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];
