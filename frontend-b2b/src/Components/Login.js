import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import './Login.css';

const LoginForm = () => {
  const [PersoneelsNummer, setPersoneelsNummer] = useState('');
  const [Email, setEmail] = useState('');
  const [Wachtwoord, setWachtwoord] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h1>Inloggen</h1>
          </div>
          <hr className="DividerLine1" />
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              id="PersoneelsNummer"
              placeholder="Je personeelsnummer"
              value={PersoneelsNummer}
              onChange={(event) => setPersoneelsNummer(event.target.value)}
            />
          </div>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              id="Email"
              placeholder="Je login of e-mailadres"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              id="Wachtwoord"
              placeholder="Wachtwoord"
              value={Wachtwoord}
              onChange={(event) => setWachtwoord(event.target.value)}
            />
          </div>
          <div className="form-actions">
            <a href="http://localhost:3000/">Wachtwoord vergeten?</a>
            <button type="submit">Log in</button>
          </div>
          <div className="footer">
            <p>Mede mogelijk gemaakt door</p>
            <hr className="DividerLine2" />
            <img src="/UMCUtrechtLogo.png" alt="UMC Utrecht" />
            <img src="/JDB logo.png" alt="JDB" />
          </div>
        </form>
      </div>
      <img className="image-container"src="/Kinderen.png" alt="Kinderen" height={700}/>
    </div>
  );
};

export default LoginForm;
