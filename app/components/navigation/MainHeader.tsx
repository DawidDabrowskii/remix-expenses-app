import Logo from "../util/Logo";
import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import mainStyles from "../../styles/shared.css?url";
import { loader } from "~/root";

function MainHeader() {
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData?.user;

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/expenses">Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {user && (
              <Form method="post" id="logout-form" action="/logout">
                <button className="cta">Logout</button>
              </Form>
            )}
            {!user && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;

export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}
