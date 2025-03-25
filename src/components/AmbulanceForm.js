import React, { useState } from "react";
import axios from "axios";

const AmbulanceForm = () => {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("Available");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ambulanceData = {
      name,
      branch,
      status
    };

    try {
      const response = await axios.post("http://localhost:8080/api/ambulances", ambulanceData);
      console.log("Ambulance created:", response.data);
      // Clear the form after successful submission
      setName("");
      setBranch("");
      setStatus("Available");
    } catch (err) {
      console.error("Error creating ambulance:", err);
      setError("There was an error creating the ambulance. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Ambulance</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ambulance Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Branch:</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Available">Available</option>
            <option value="On Route">On Route</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Ambulance</button>
        </div>
      </form>
    </div>
  );
};

export default AmbulanceForm;
