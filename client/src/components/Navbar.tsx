import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
// import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">MiniBlog</Link>
        <div className="ms-auto d-flex gap-2">
          <ThemeToggle />
          {token ? (
            <>
              <Link to="/create" className="btn btn-light btn-sm">Create</Link>
              <button onClick={logout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="btn btn-light btn-sm">Login</Link>
              <Link to="/register" className="btn btn-warning btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;