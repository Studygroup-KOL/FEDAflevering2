import { useEffect, useState } from "react";
import { get } from "../services/api";
import ExpenseCard from "../components/ExpenseCard";
import "./ExpenseList.css"; 

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
interface Expense {
  expenseId: number;
  modelId: number;
  jobId: number;
  date: Date;
  text: string;
  amount: number;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    get("/Expenses")
      .then((data: Expense[]) => setExpenses(data))
      .catch((err) => alert("Failed to load expenses: " + err));
  }, []);

  return (
    <div className="expense-list">
      <h2>Expenses List</h2>
      {expenses.length === 0 ? (
        <p>No expenses available.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.expenseId}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
