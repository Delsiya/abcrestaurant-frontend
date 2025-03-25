import React, { useState } from "react";
import { getDistance } from "geolib";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hospitals = [
  { name: "Universe Jaffna", lat: 9.66845, lng: 80.00742, phone: "+94112345678" },
  { name: "Universe Kodikamam", lat: 9.6762, lng: 80.2544, phone: "+94123456789" },
  { name: "Universe Chavakacheri", lat: 9.6585, lng: 80.1611, phone: "+94134567890" },
];

const IncidentForm = () => {
  const [name, setName] = useState("");
  const [incident, setIncident] = useState("");
  const [location, setLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const getLocation = () => {
    setLoading(true); // Start loading
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          findNearbyHospitals(userLocation);
          setLoading(false); // End loading
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(`Error fetching location: ${error.message}`);
          setLoading(false); // End loading
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false); // End loading
    }
  };

  const findNearbyHospitals = (userLocation) => {
    const sortedHospitals = hospitals
      .map((hospital) => ({
        ...hospital,
        distance: getDistance(
          { latitude: userLocation.lat, longitude: userLocation.lng },
          { latitude: hospital.lat, longitude: hospital.lng }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    setNearbyHospitals(sortedHospitals);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleNotify = (hospitalName) => {
    alert(`Notification sent to ${hospitalName}`);
  };

  return (
    <div className="incident-form-container">
      <h1>Report an Incident</h1>
      <form className="incident-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Describe the incident"
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          className="input-field"
        />
        <button type="button" onClick={getLocation} className="location-btn">
          {loading ? "Fetching Location..." : "Get Live Location"}
        </button>

        {location && (
          <p>
            Location: Latitude: {location.lat}, Longitude: {location.lng}
          </p>
        )}
      </form>

      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={12} style={{ height: "400px", width: "100%", marginTop: "20px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Your Location</Popup>
          </Marker>

          {nearbyHospitals.map((hospital, index) => (
            <Marker key={index} position={[hospital.lat, hospital.lng]}>
              <Popup>
                <strong>{hospital.name}</strong> <br />
                Distance: {(hospital.distance / 1000).toFixed(2)} km <br />
                <button onClick={() => handleCall(hospital.phone)}>📞 Call</button> <br />
                <button onClick={() => handleNotify(hospital.name)}>🚑 Notify</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {nearbyHospitals.length > 0 && (
        <div className="hospital-list">
          <h2>Nearby Hospitals</h2>
          <ul>
            {nearbyHospitals.map((hospital, index) => (
              <li key={index} className="hospital-item">
                <p>
                  <strong>{hospital.name}</strong> <br />
                  Distance: {(hospital.distance / 1000).toFixed(2)} km
                </p>
                <div className="hospital-actions">
                  <button onClick={() => handleCall(hospital.phone)} className="action-btn">
                    Call Ambulance
                  </button>
                  <button onClick={() => handleNotify(hospital.name)} className="action-btn">
                    Notify Hospital
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncidentForm;
