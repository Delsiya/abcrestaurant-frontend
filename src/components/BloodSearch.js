import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import '../css/bloodsearch.css';

// Haversine formula to calculate the distance between two latitude/longitude points
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns distance in kilometers
};

const BloodSearch = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [branch, setBranch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // Dummy data for blood donors with blood group, branch, coordinates, and contact info
  const bloodDonors = [
    { id: 1, name: "John Doe", bloodGroup: "A+", branch: "Colombo", lat: 6.9271, lon: 79.8612, phone: "0771234567" },
    { id: 2, name: "Jane Smith", bloodGroup: "A+", branch: "Colombo", lat: 6.9333, lon: 79.8485, phone: "0772345678" },
    { id: 3, name: "Robert Brown", bloodGroup: "A+", branch: "Colombo", lat: 6.9200, lon: 79.8600, phone: "0773456789" },
    { id: 4, name: "Alice Johnson", bloodGroup: "A+", branch: "Colombo", lat: 6.9220, lon: 79.8600, phone: "0774567890" },
    { id: 5, name: "Michael Williams", bloodGroup: "A+", branch: "Colombo", lat: 6.9300, lon: 79.8590, phone: "0775678901" },
    { id: 6, name: "Sarah Lee", bloodGroup: "O+", branch: "Colombo", lat: 6.9370, lon: 79.8700, phone: "0776789012" },
    { id: 7, name: "David Clark", bloodGroup: "AB+", branch: "Colombo", lat: 6.9195, lon: 79.8565, phone: "0777890123" },
    { id: 8, name: "Emily Davis", bloodGroup: "A+", branch: "Colombo", lat: 6.9255, lon: 79.8585, phone: "0778901234" },
    { id: 9, name: "Lucas Evans", bloodGroup: "B+", branch: "Colombo", lat: 6.9295, lon: 79.8625, phone: "0779012345" },
    { id: 10, name: "Sophia Martin", bloodGroup: "AB-", branch: "Colombo", lat: 6.9235, lon: 79.8645, phone: "0770123456" },
    // Add more donors as needed
  ];

  // List of available blood groups and branches for selection
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const branches = [
    { name: "Colombo", lat: 6.9271, lon: 79.8612 },
    { name: "Kandy", lat: 7.2906, lon: 80.6343 },
    { name: "Galle", lat: 6.0373, lon: 80.2200 },
    { name: "Jaffna", lat: 9.6615, lon: 80.0219 },
    { name: "Negombo", lat: 7.2081, lon: 79.9876 },
  ];

  const handleSearch = () => {
    if (!branch) {
      alert("Please select a branch");
      return;
    }

    // Find the selected branch coordinates
    const selectedBranch = branches.find((b) => b.name === branch);

    // Filter donors based on the selected blood group, branch, and distance to the selected branch
    const results = bloodDonors.filter(
      (donor) =>
        (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
        (branch ? donor.branch === branch : true) &&
        haversine(selectedBranch.lat, selectedBranch.lon, donor.lat, donor.lon) <= 10 // 10 km radius
    );

    setSearchResults(results); // Set the matching donors
  };

  const handleCall = (phoneNumber) => {
    // Implement the functionality to initiate a call (can be a link to dial the number)
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div>
      <h2>Search for Blood Donors Near a Branch</h2>

      {/* Blood Group Dropdown */}
      <label>Blood Group:</label>
      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option value="">Select Blood Group</option>
        {bloodGroups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
      <br />

      {/* Branch Dropdown */}
      <label>Branch:</label>
      <select
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      >
        <option value="">Select Branch</option>
        {branches.map((branchName) => (
          <option key={branchName.name} value={branchName.name}>
            {branchName.name}
          </option>
        ))}
      </select>
      <br />

      <button onClick={handleSearch}>Search</button>

      {/* Display the map after search */}
      {searchResults && searchResults.length > 0 && (
        <div>
          <h3>Donors' Locations</h3>
          <MapContainer
            center={[searchResults[0].lat, searchResults[0].lon]} // Center the map around the first donor
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {searchResults.map((donor) => (
              <Marker
                key={donor.id}
                position={[donor.lat, donor.lon]}
                icon={
                  new Icon({
                    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                  })
                }
              >
                <Popup>
                  <div>
                    <h4>{donor.name}</h4>
                    <p>Blood Group: {donor.bloodGroup}</p>
                    <p>Branch: {donor.branch}</p>
                    <p>
                      <button onClick={() => handleCall(donor.phone)}>
                        Call Donor
                      </button>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* If no donors found */}
      {searchResults && searchResults.length === 0 && (
        <p>No donors found within 10 km of the selected branch.</p>
      )}
    </div>
  );
};

export default BloodSearch;
