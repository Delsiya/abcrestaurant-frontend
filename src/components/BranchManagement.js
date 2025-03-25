import React, { useState } from "react";

const BranchManagement = () => {
  const [branch, setBranch] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Branch Data Submitted:", branch);
    
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Create Branch</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ fontWeight: "500" }}>Branch Name</label>
          <input
            type="text"
            name="name"
            value={branch.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: "500" }}>Address</label>
          <input
            type="text"
            name="address"
            value={branch.address}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: "500" }}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={branch.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: "500" }}>Email</label>
          <input
            type="email"
            name="email"
            value={branch.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
        >
          Create Branch
        </button>
      </form>
    </div>
  );
};

export default BranchManagement;
