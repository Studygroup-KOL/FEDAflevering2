import { Link, useNavigate } from "react-router-dom";
import { parseJwt } from "../services/api";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role: string | null = null;

  try {
    if (token) {
      const payload = parseJwt(token);
      role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  } catch {
    role = null;
  }

  if (!token || !role) return null;

  const isManager = role === "Manager";

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>LOK's MODELS</h1>
      </div>

      <div className="navbar-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>
        {isManager ? (
          <>
            <Link to="/create-model">Create User</Link>
            <Link to="/JobForm">Create Job</Link>
            <Link to="/add-model-to-job">Add Model</Link>
            <Link to="/remove-model-from-job">Remove Model</Link>
            <Link to="/expenses">Expenses</Link>
          </>
        ) : (
          <Link to="/addExpense">Add Expense</Link>
        )}
      </div>

      <div className="navbar-right">
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
