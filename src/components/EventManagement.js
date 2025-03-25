import React, { useState } from 'react';

function EventManagement() {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    donorNumbers: '', // Added field for donor numbers
    message: 'Thank you for being a valuable donor!',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending the event details and message to all donors
    console.log('Event Details Submitted:', eventDetails);

    // Show a success message
    alert('Event details sent successfully to all donors!');
  };

  return (
    <div className="event-management-container">
      <h2>Event Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>

        <div>
          <label>Event Date:</label>
          <input
            type="date"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Event Time:</label>
          <input
            type="time"
            name="eventTime"
            value={eventDetails.eventTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Donor Contact Numbers:</label>
          <input
            type="text"
            name="donorNumbers"
            value={eventDetails.donorNumbers}
            onChange={handleChange}
            placeholder="Enter donor numbers (comma-separated)"
            required
          />
        </div>

        <div>
          <label>Message to Donors:</label>
          <textarea
            name="message"
            value={eventDetails.message}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your message to donors"
          />
        </div>

        <div>
          <button type="submit">Send Event Details</button>
        </div>
      </form>
    </div>
  );
}

export default EventManagement;
