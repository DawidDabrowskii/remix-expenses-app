import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { MainLayout } from "~/layout/main.layout";
import { validateCredentials } from "~/data/validation.server";
import { login, signup } from "~/data/auth.server";

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

  try {
    validateCredentials({
      email: credentials.email as string,
      password: credentials.password as string,
    });
  } catch (error) {
    return Response.json({ message: "Invalid credentials" }, { status: 400 });
  }

  try {
    if (authMode === "login") {
      const result = await login({
        email: credentials.email as string,
        password: credentials.password as string,
      });

      if ("error" in result && result.error) {
        return Response.json(
          { message: result.error.message },
          { status: result.error.status }
        );
      }

      return result;
    } else {
      const result = await signup({
        email: credentials.email as string,
        password: credentials.password as string,
      });

      if ("error" in result && result.error) {
        return Response.json(
          { message: result.error.message },
          { status: result.error.status }
        );
      }

      return result;
    }
  } catch (error) {
    return Response.json(
      { message: "Failed to authenticate" },
      { status: 500 }
    );
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];
