import { useState } from "react";
import { post } from "../services/api";
import "./ModelForm.css";

export default function UserForm() {
  const [userType, setUserType] = useState("model");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const path = userType === "manager" ? "/Managers" : "/Models";

    const body: any = {
      email,
      password,
      firstName,
      lastName,
    };

    if (userType === "model") {
      Object.assign(body, {
        phoneNo: "12345678",
        addressLine1: "Main Street 1",
        addressLine2: "",
        zip: "1000",
        city: "Copenhagen",
        country: "Denmark",
        birthDate: new Date("2000-01-01").toISOString(),
        nationality: "Danish",
        height: "180",
        shoeSize: "42",
        hairColor: "Brown",
        eyeColor: "Blue",
        comments: "Test model",
      });
    }

    try {
      await post(path, body);
      alert(`${userType === "manager" ? "Manager" : "Model"} created!`);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      alert(`Error creating ${userType}`);
      console.error(err);
    }
  };

  return (
    <div className="model-form">
      <h2>Create New {userType === "manager" ? "Manager" : "Model"}</h2>

      <div className="form-group">
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="model">Model</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>First Name:</label>
        <input
          type="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
