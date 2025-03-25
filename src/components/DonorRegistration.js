import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/donor.css"
const DonorRegistration = () => {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    healthConditions: "",
    eligibility: "Not Eligible", // Default eligibility
    address: "",
    weight: "",
    height: "",
  });
  const [message, setMessage] = useState(""); // For feedback

  // Fetch the list of donors on component mount
  useEffect(() => {
    fetchDonors();
  }, []);

  // Function to fetch donors
  const fetchDonors = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/donors");
      setDonors(data); // Update the donors state with the fetched data
    } catch (error) {
      console.error("Error fetching donors:", error);
      alert("An error occurred while fetching donors.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.bloodGroup) {
      alert("Please fill in all required fields!");
      return;
    }

    if (formData.age < 18 || formData.age > 65) {
      alert("Age must be between 18 and 65.");
      return;
    }

    if (formData.weight < 50 || formData.height < 150) {
      alert("Donor must be at least 50kg and 150cm in height.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/donors", formData);
      setMessage("Donor registered successfully!");
      resetForm(); // Reset the form fields
      fetchDonors(); // Refresh donor list
    } catch (error) {
      console.error("Error registering donor:", error);
      alert("An error occurred while registering the donor.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      bloodGroup: "",
      healthConditions: "",
      eligibility: "Not Eligible",
      address: "",
      weight: "",
      height: "",
    });
  };

  // Handle eligibility change
  const handleEligibilityChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8081/api/donors/${id}`, { eligibility: status });

      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor.id === id ? { ...donor, eligibility: status } : donor
        )
      );
    } catch (error) {
      console.error("Error updating eligibility:", error);
      alert("Failed to update eligibility status.");
    }
  };

  return (
    <div>
      <h1>Donor Registration</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="65" required />
        </div>
        <div>
          <label>Blood Group:</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div>
          <label>Health Conditions:</label>
          <textarea name="healthConditions" value={formData.healthConditions} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} min="50" required />
        </div>
        <div>
          <label>Height (cm):</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} min="150" required />
        </div>

        <button type="submit">Register Donor</button>
      </form>

      <h2>Registered Donors</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Health Conditions</th>
            <th>Address</th>
            <th>Geolocation</th>
            <th>Eligibility</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.name}</td>
              <td>{donor.age}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.healthConditions || "None"}</td>
              <td>{donor.address}</td>
              <td>
                {donor.latitude && donor.longitude ? `${donor.latitude}, ${donor.longitude}` : "N/A"}
              </td>
              <td>
                <select value={donor.eligibility} onChange={(e) => handleEligibilityChange(donor.id, e.target.value)}>
                  <option value="Eligible">Eligible</option>
                  <option value="Not Eligible">Not Eligible</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorRegistration;
