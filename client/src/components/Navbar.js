import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h1 className="logo">🌿 EcoTrack</h1>

      <div>
        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="signup-btn">
            Create Account
          </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;