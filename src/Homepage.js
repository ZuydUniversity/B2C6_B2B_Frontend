import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />
        <div className="contact-info">
          <h2>Rik Goedelen</h2>
          <p>tel: +3149731949</p>
          <p>mail: fysiobijgoedelen@gmail.com</p>
          <p>specialisatie: Manuele Therapie - Fysio</p>
        </div>
      </header>
      <main className="main-content">
        <div className="notities">
          <h3>Kies een notitie</h3>
          <ul>
            <li>Maandag 15-08 Joep Doe</li>
            <li>Woensdag 09-07 Elisa van Winkel</li>
            <li>Woensdag 09-07 Joep Doe</li>
          </ul>
        </div>
        <div className="toevoegen">
          <h3>Toevoegen</h3>
          <ul>
            <li>Maandag 15-06 Karel van Stad</li>
            <li>Woensdag 26-04 Joep Doe</li>
            <li>Maandag 15-01 Elisa van Winkel</li>
          </ul>
        </div>
        <div className="search">
          <input type="text" placeholder="Afspraak zoeken ..." />
        </div>
      </main>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById("myModal").style.display = "none"}>&times;</span>
          {/* Placeholder for modal content */}
          <p>Modal content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
