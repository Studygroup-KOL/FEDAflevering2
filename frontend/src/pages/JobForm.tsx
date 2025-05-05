import { useState } from "react";
import { post } from "../services/api";
import "./JobForm.css"; 

export default function JobForm() {
  const [customer, setCustomer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    const body = { customer, startDate, days, location, comments };

    try {
      await post("/Jobs", body);
      alert("Job created!");
      setCustomer("");
      setStartDate("");
      setDays(1);
      setLocation("");
      setComments("");
    } catch {
      alert("Error creating job");
    }
  };

  return (
    <div
      className="job-form"
      style={{ maxWidth: "400px", margin: "50px auto", padding: "1rem" }}
    >
      <h2>Create New Job</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Customer:</label>
        <br />
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Start Date:</label>
        <br />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Number of Days:</label>
        <br />
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Location:</label>
        <br />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Comments:</label>
        <br />
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Create
      </button>
    </div>
  );
}
