import { useEffect, useState } from "react";
import { get, post, parseJwt } from "../services/api";
import "./AddExpense.css";

interface Job {
  jobId: number;
  customer: string;
}

export default function AddExpense() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [jobId, setJobId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");
  const modelId = token ? parseJwt(token)["ModelId"] : null;

  useEffect(() => {
    get("/Jobs")
      .then(setJobs)
      .catch(() => alert("Failed to load jobs"));
  }, []);

  const handleSubmit = async () => {
    if (!modelId) {
      alert("Model ID missing from token");
      return;
    }

    const body = {
      modelId: Number(modelId),
      jobId: Number(jobId),
      date: new Date(date).toISOString(),
      text,
      amount: Number(amount),
    };

    try {
      await post("/Expenses", body);
      alert("Expense submitted");
      setJobId("");
      setDate(new Date().toISOString().substring(0, 10));
      setText("");
      setAmount("");
    } catch {
      alert("Failed to submit expense");
    }
  };

  return (
    <div className="expense-form">
      <h2>Submit Expense</h2>

      <div className="form-group">
        <label>Job:</label>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)}>
          <option value="">Select a job</option>
          {jobs.map((job) => (
            <option key={job.jobId} value={job.jobId}>
              {job.customer} (ID: {job.jobId})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount (DKK):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
