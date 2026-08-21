import { Link } from "react-router-dom";
import "../styles/Home.css";

function PublicNavbar() {
  return (
    <nav className="public-navbar">

      <Link to="/" className="brand">
        <div className="brand-icon">
          ✦
        </div>

        <span>AI Task Manager</span>
      </Link>

      <div className="public-nav-actions">
        <Link to="/login" className="nav-login">
          Login
        </Link>

        <Link to="/signup" className="nav-signup">
          Get Started
        </Link>
      </div>

    </nav>
  );
}

export default PublicNavbar;