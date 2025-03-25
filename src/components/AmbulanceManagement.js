import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";

// Sample data for hospitals
const hospitalsData = [
  { id: 1, name: "Universe Jaffna", lat: 9.66845, lng: 80.00742 },
  { id: 2, name: "Universe Chavakacheri", lat: 9.6585, lng: 80.1611 },
  { id: 3, name: "Universe Nallur", lat: 9.6825, lng: 80.012 },
];

const AmbulanceManagement = () => {
  const [ambulances, setAmbulances] = useState([
    { id: 1, name: "Ambulance 1", branch: "Universe Jaffna", status: "Available" },
    { id: 2, name: "Ambulance 2", branch: "Universe Chavakacheri", status: "Available" },
    { id: 3, name: "Ambulance 3", branch: "Universe Nallur", status: "On Route" },
  ]);
  const [incidents, setIncidents] = useState([]);
  const [callerDetails, setCallerDetails] = useState({ name: "", phone: "", caseType: "", address: "" });
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);

  // Fetch live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Function to find the nearest hospital based on location
  const findNearestHospital = (userLocation) => {
    const nearest = hospitalsData
      .map((hospital) => ({
        ...hospital,
        distance: getDistance(userLocation, { latitude: hospital.lat, longitude: hospital.lng }),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    setNearestHospital(nearest);
  };

  // Handle incident submission
  const handleIncidentSubmit = () => {
    const newIncident = {
      id: incidents.length + 1,
      caller: callerDetails.name,
      phone: callerDetails.phone,
      caseType: callerDetails.caseType,
      address: callerDetails.address,
      status: "Pending",
    };
    setIncidents((prevIncidents) => [...prevIncidents, newIncident]);

    // Find nearest hospital
    if (userLocation) {
      findNearestHospital(userLocation);
    }
  };

  // Handle ambulance assignment
  const handleAssignAmbulance = (incidentId, ambulanceId) => {
    setIncidents((prevIncidents) => prevIncidents.map((incident) => {
      if (incident.id === incidentId) {
        return { ...incident, status: "Assigned", assignedAmbulance: ambulances.find(a => a.id === ambulanceId).name };
      }
      return incident;
    }));

    setAmbulances((prevAmbulances) => prevAmbulances.map((ambulance) => {
      if (ambulance.id === ambulanceId) {
        return { ...ambulance, status: "On Route" };
      }
      return ambulance;
    }));
  };

  // Notify hospital
  const notifyHospital = () => {
    if (nearestHospital) {
      alert(`Notification sent to ${nearestHospital.name} for ambulance service!`);
    }
  };

  return (
    <div>
      <h1>Ambulance Management</h1>

      <h3>Caller Details</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={callerDetails.name}
        onChange={(e) => setCallerDetails({ ...callerDetails, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={callerDetails.phone}
        onChange={(e) => setCallerDetails({ ...callerDetails, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Case Type (e.g., Heart Attack)"
        value={callerDetails.caseType}
        onChange={(e) => setCallerDetails({ ...callerDetails, caseType: e.target.value })}
      />
      <input
        type="text"
        placeholder="Incident Address"
        value={callerDetails.address}
        onChange={(e) => setCallerDetails({ ...callerDetails, address: e.target.value })}
      />
      <button onClick={handleIncidentSubmit}>Submit Incident</button>

      <div>
        {incidents.map((incident) => (
          <div key={incident.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h2>Incident Details:</h2>
            <p><strong>Name:</strong> {incident.caller}</p>
            <p><strong>Phone:</strong> {incident.phone}</p>
            <p><strong>Case Type:</strong> {incident.caseType}</p>
            <p><strong>Address:</strong> {incident.address}</p>
            <p><strong>Status:</strong> {incident.status}</p>

            {incident.status === "Pending" && nearestHospital && (
              <div>
                <h3>Nearest Hospital: {nearestHospital.name}</h3>
                <p>Distance: {nearestHospital.distance / 1000} km</p>
                <button onClick={notifyHospital}>Notify Hospital</button>
                <select
                  onChange={(e) => handleAssignAmbulance(incident.id, e.target.value)}
                  defaultValue=""
                >
                  <option value="">Select an Ambulance</option>
                  {ambulances.filter(ambulance => ambulance.status === "Available").map((ambulance) => (
                    <option key={ambulance.id} value={ambulance.id}>{ambulance.name} - {ambulance.branch}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceManagement;
