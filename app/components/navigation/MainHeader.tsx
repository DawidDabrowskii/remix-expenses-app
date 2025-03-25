import Logo from "../util/Logo";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import mainStyles from "../../styles/shared.css?url";
import { loader } from "~/root";

function MainHeader() {
  const userId = useLoaderData<typeof loader>();

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
            {userId && (
              <form method="post" action="/logout">
                <button className="cta">Logout</button>
              </form>
            )}
            {!userId && (
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
