import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const authMode = searchParams.get("mode") || "login";
  const validationErrors = useActionData();

  const submitButtonText = authMode === "login" ? "Login" : "Signup";
  const linkText =
    authMode === "login" ? "Create new user" : "Login with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {!!validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitButtonText}
        </button>
        <Link to={`?mode=${authMode === "login" ? "signup" : "login"}`}>
          {linkText}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
