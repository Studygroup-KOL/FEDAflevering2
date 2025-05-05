import { useEffect, useState } from "react";
import { get, post } from "../services/api";
import "./AddModelToJob.css"; 

interface Job {
  jobId: number;
  customer: string;
}

interface Model {
  modelId: number;
  firstName: string;
  lastName: string;
}

export default function AddModelToJob() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [jobId, setJobId] = useState("");
  const [modelId, setModelId] = useState("");

  useEffect(() => {
    get("/Jobs")
      .then(setJobs)
      .catch(() => alert("Failed to load jobs"));
    get("/Models")
      .then(setModels)
      .catch(() => alert("Failed to load models"));
  }, []);

  const handleSubmit = async () => {
    try {
      await post(`/Jobs/${jobId}/model/${modelId}`, {});
      alert("Model added to job");
      setJobId("");
      setModelId("");
    } catch {
      alert("Failed to add model to job");
    }
  };

  return (
    <div className="model-job-form">
      <h2>Add Model to Job</h2>

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
        <label>Model:</label>
        <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
          <option value="">Select a model</option>
          {models.map((model) => (
            <option key={model.modelId} value={model.modelId}>
              {model.firstName} {model.lastName} (ID: {model.modelId})
            </option>
          ))}
        </select>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}
