import React from 'react';
import '../styles.css'; // Ensure this path is correct based on your directory structure

function Home() {
  return (
    <main>
      <section id="home" className="section">
        <h2>About Us</h2>
        <p>
          Founded with a passion for exceptional cuisine and hospitality, ABC Restaurant has been a staple in our community for over a decade. From our humble beginnings, we’ve grown into a renowned establishment known for our diverse menu and commitment to quality. Our journey has been driven by a dedication to providing outstanding dining experiences, combining fresh, locally-sourced ingredients with innovative culinary techniques.
        </p>
        <p>
          Today, ABC Restaurant continues to uphold our tradition of excellence. We offer a wide range of dining options, including dine-in and takeout services, and have expanded our offerings to include comfortable, well-equipped rooms for a relaxing stay. Our Single Rooms, Double Rooms, and Family Suites cater to various needs, while our elegant wedding hall is perfect for celebrating special occasions. Join us to enjoy a blend of great food, comfortable accommodations, and exceptional service.
        </p>
      </section>

      <footer className="footer">
        <div className="contact-details">
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@abcrestaurant.com</p>
          <p>Address: 123 alexanda Road, Colombo 6</p>
        </div>
        <p>&copy; 2024 ABC Restaurant. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default Home;
