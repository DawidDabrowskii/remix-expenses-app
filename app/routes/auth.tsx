import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  console.log(credentials);

  // validate credentials

  if (authMode === "login") {
    // login logic
  } else {
    // signup logic
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];
