import Logo from "../util/Logo";
import { Link, NavLink } from "@remix-run/react";
import mainStyles from "../../styles/shared.css?url";

function MainHeader() {
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
            <Link to="/auth" className="cta">
              Login
            </Link>
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
