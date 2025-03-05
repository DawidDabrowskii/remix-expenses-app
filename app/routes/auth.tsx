import { LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";

export function AuthPage() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}

export default AuthPage;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];
