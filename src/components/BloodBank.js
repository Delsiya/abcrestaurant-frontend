import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/BloodBank.css"

const BloodBank = () => {
  const [bloodStock, setBloodStock] = useState([]);
  const [reports, setReports] = useState([]);

  // Mock Data for Blood Stock
  const mockBloodStock = [
    { id: 1, branch_name: "Colombo", blood_type: "A+", units_available: 4 },
    { id: 2, branch_name: "Kandy", blood_type: "B+", units_available: 10 },
    { id: 3, branch_name: "Jaffna", blood_type: "O-", units_available: 2 },
    { id: 4, branch_name: "Galle", blood_type: "AB+", units_available: 7 },
    { id: 5, branch_name: "Batticaloa", blood_type: "A-", units_available: 1 },
  ];

  // Mock Data for Blood Bank Reports
  const mockReports = [
    { id: 1, branch_name: "Colombo", blood_type: "A+", donations: 30, usage: 28 },
    { id: 2, branch_name: "Kandy", blood_type: "B+", donations: 40, usage: 35 },
    { id: 3, branch_name: "Jaffna", blood_type: "O-", donations: 25, usage: 20 },
    { id: 4, branch_name: "Galle", blood_type: "AB+", donations: 20, usage: 18 },
    { id: 5, branch_name: "Batticaloa", blood_type: "A-", donations: 15, usage: 12 },
  ];

  // Simulate fetching data from API
  useEffect(() => {
    setBloodStock(mockBloodStock);
    setReports(mockReports);
    checkLowStock(mockBloodStock);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check Low Stock and Notify Admin
  const checkLowStock = (stock) => {
    stock.forEach((item) => {
      if (item.units_available < 5) {
        toast.warning(`⚠️ Low stock: ${item.blood_type} at ${item.branch_name}`);
      }
    });
  };

  return (
    <div className="container">
      <h1>Blood Bank Management</h1>

      {/* Blood Stock Section */}
      <h2>Blood Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Blood Type</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {bloodStock.map((item) => (
            <tr key={item.id}>
              <td>{item.branch_name}</td>
              <td>{item.blood_type}</td>
              <td>{item.units_available}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Blood Report Section */}
      <h2>Blood Bank Report</h2>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Blood Type</th>
            <th>Donations</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item) => (
            <tr key={item.id}>
              <td>{item.branch_name}</td>
              <td>{item.blood_type}</td>
              <td>{item.donations}</td>
              <td>{item.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default BloodBank;
