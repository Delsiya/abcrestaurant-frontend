import React, { useState } from 'react';
import queryImage from '../images/service.jpg';
import '../styles.css'; // Ensure the correct path to the image

function Queries() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmitQuery = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/queries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, query }), // Ensure the correct field names
      });

      if (response.ok) {
        setStatusMessage('Query submitted successfully');
        setEmail('');
        setQuery('');
      } else {
        const errorText = await response.text();
        setStatusMessage(`Error submitting query: ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      setStatusMessage('Error submitting query');
    }
  };

  return (
    <section
      id="queries"
      style={{
        backgroundImage: `url(${queryImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3em 0',
      }}
    >
      <div className="container">
        <h2>Submit a Query</h2>
        <form onSubmit={handleSubmitQuery}>
          <label htmlFor="email">
            Your Email:
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="query">
            Your Query:
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>
          </label>
          <button type="submit">Submit Query</button>
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
}

export default Queries;
