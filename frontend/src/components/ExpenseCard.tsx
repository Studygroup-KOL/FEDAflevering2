import { useState, useEffect } from "react";
import { get } from "../services/api";
import "./ExpenseCard.css";

interface Expense {
  expenseId: number;
  modelId: number;
  jobId: number;
  date: Date;
  text: string;
  amount: number;
}

export default function ExpenseCard({ expense }: { expense: Expense }) {

  const [modelName, setModelName] = useState<string>(`Loading Model Name...`);
  const [jobCustomer, setJobCustomer] = useState<string>(`Loading Job Customer...`);

  useEffect(() => {
    // Her hentes modellens navn baseret på ID'et i expensen
    get(`/Models/${expense.modelId}`)
      .then(modelData => {
        setModelName(`${modelData.firstName} ${modelData.lastName}`);
      })
      .catch(err => {
        console.error(`Failed to fetch model ${expense.modelId}:`, err);
        setModelName(`Model ID: ${expense.modelId} (Not Found)`);
      });

    // Her hentes customers navn baseret på JobID'et
    get(`/Jobs/${expense.jobId}`)
      .then(jobData => {
        setJobCustomer(jobData.customer);
      })
      .catch(err => {
        console.error(`Failed to fetch job ${expense.jobId}:`, err);
        setJobCustomer(`Job ID: ${expense.jobId} (Not Found)`);
      });
  }, []);

  return (
    <div className="expense-card">
      <h3>{expense.text || "No Expense Text"}</h3>
      <p>
        <strong>Model:</strong> {modelName}
      </p>
      <p>
        <strong>Job Customer:</strong> {jobCustomer}
      </p>
      <p>
        <strong>Date of Expense:</strong>{" "}
        {new Date(expense.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Price:</strong> {expense.amount} DKK
      </p>
    </div>
  );
}
