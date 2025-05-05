import { useEffect, useState } from "react";
import { get } from "../services/api";
import JobCard from "../components/JobCard";
import "./JobList.css"; 

interface Model {
  modelId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}
interface Job {
  jobId: number;
  customer: string;
  startDate: string;
  days: number;
  location: string;
  comments: string;
  models: Model[];
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    get("/Jobs")
      .then((data: Job[]) => setJobs(data))
      .catch((err) => alert("Failed to load jobs: " + err));
  }, []);

  return (
    <div className="job-list">
      <h2>Job List</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.jobId}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
