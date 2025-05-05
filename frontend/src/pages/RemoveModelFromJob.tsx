import { useEffect, useState } from "react";
import { get, del } from "../services/api";
import "./RemoveModelFromJob.css"; 

interface Job {
  jobId: number;
  customer: string;
}

interface Model {
  modelId: number;
  firstName: string;
  lastName: string;
}

export default function RemoveModelFromJob() {
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
      await del(`/Jobs/${jobId}/model/${modelId}`);
      alert("Model removed from job");
      setJobId("");
      setModelId("");
    } catch {
      alert("Failed to remove model from job");
    }
  };

  return (
    <div className="remove-model-form">
      <h2>Remove Model from Job</h2>

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

      <button onClick={handleSubmit}>Remove</button>
    </div>
  );
}
