import { useNavigate } from "react-router-dom";
import { parseJwt } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return <p className="dashboard-error">Unauthorized</p>;

  let payload: any;
  try {
    payload = parseJwt(token);
  } catch {
    return <p className="dashboard-error">Invalid token</p>;
  }

  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const isManager = role === "Manager";

  return (
    <div className="dashboard-card">
      <h2>{isManager ? "Manager Dashboard" : "Model Dashboard"}</h2>
      <div className="dashboard-buttons">
        {isManager ? (
          <>
            <button onClick={() => navigate("/jobs")}>View Jobs</button>
            <button onClick={() => navigate("/create-model")}>
              Create New User
            </button>
            <button onClick={() => navigate("/JobForm")}>Create New Job</button>
            <button onClick={() => navigate("/add-model-to-job")}>
              Add Model to Job
            </button>
            <button onClick={() => navigate("/remove-model-from-job")}>
              Remove Model from Job
            </button>
            <button onClick={() => navigate("/expenses")}>View Model Expenses</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/jobs")}>View My Jobs</button>
            <button onClick={() => navigate("/addExpense")}>
              Add Expense to Job
            </button>
          </>
        )}
      </div>
    </div>
  );
}
