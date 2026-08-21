import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="app-navbar">

      <Link to="/dashboard" className="app-brand">
        <div className="app-brand-icon">
          ✦
        </div>

        <span>AI Task Manager</span>
      </Link>


      <div className="app-nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        {role === "admin" && (
          <Link to="/users">
            Users
          </Link>
        )}

        <Link to="/documents">
          Documents
        </Link>

        <Link to="/search">
          AI Search
        </Link>

        {role === "admin" && (
          <Link to="/analytics">
            Analytics
          </Link>
        )}

        <button
          className="app-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;