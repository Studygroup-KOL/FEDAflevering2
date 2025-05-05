import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import ModelForm from "./pages/ModelForm";
import JobForm from "./pages/JobForm";
import AddModelToJob from "./pages/AddModelToJob";
import RemoveModelFromJob from "./pages/RemoveModelFromJob";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />} {/* Navbar only shown when logged in */}
      <Routes key={token}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={token ? <JobList /> : <Navigate to="/login" />} />
        <Route path="/create-model" element={token ? <ModelForm /> : <Navigate to="/login" />} />
        <Route path="/JobForm" element={token ? <JobForm /> : <Navigate to="/login" />} />
        <Route path="/add-model-to-job" element={token ? <AddModelToJob /> : <Navigate to="/login" />} />
        <Route path="/remove-model-from-job" element={token ? <RemoveModelFromJob /> : <Navigate to="/login" />} />
        <Route path="/expenses" element={token ? <ExpenseList /> : <Navigate to="/login" />} />
        <Route path="/addExpense" element={token ? <AddExpense /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
