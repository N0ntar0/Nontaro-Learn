import { NavLink } from "react-router-dom";
import "./AppHeader.css";

function AppHeader() {
  return (
    <header className="app-header">
      <nav className="app-nav">
        <NavLink to="/" end className="app-tab">
          Home
        </NavLink>
        <NavLink to="/roulette" className="app-tab">
          ルーレット
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
