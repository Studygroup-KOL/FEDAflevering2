import { useState, useEffect } from "react"; // Import useState and useEffect
import { parseJwt } from "../services/api";
import "./JobCard.css";

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

export default function JobCard({ job }: { job: Job }) {

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Hent brugerens token og find ud af hvilken rolle de har med microsoft identity.
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = parseJwt(token);
        const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role);
      } catch (e) {
        console.error("Failed to parse token in JobCard:", e);
        setUserRole(null); // Hivs der sker en error så sætter vi lige til null så det ikke brickes
      }
    }
  }, []);
  
  const isManager = userRole === "Manager";

  return (
    <div className="job-card">
      <h3>{job.customer || "Unnamed Customer"}</h3>
      <p>
        <strong>Job ID:</strong> {job.jobId}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(job.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Duration:</strong> {job.days} day(s)
      </p>
      <p>
        <strong>Location:</strong> {job.location || "N/A"}
      </p>
      <p>
        <strong>Comments:</strong> {job.comments || "N/A"}
      </p>
      {/* Det her render kun models som en del af kortet hvis JWT tokenen 
      indeholder at brugeren er Manager, måske noget GDPR så tænkte det var smart og 
      så har modeller ikke adgang til at modtage hvilke andre modeller er med på endpointet */}
      {isManager && (
        <p>
          <strong>Models:</strong>{" "}
          {job.models && job.models.length > 0
            ? job.models
                .map((model) => `${model.firstName} ${model.lastName}`)
                .join(", ")
            : "N/A"}
        </p>
      )}
    </div>
  );
}
