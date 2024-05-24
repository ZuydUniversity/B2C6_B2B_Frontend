import React, { useState } from 'react';
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
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h1>Inloggen</h1>
        </div>
        <hr className="DividerLine" />
        <div className="form-group">
          <input
            type="text"
            id="PersoneelsNummer"
            placeholder="Personeelsnummer"
            value={PersoneelsNummer}
            onChange={(event) => setPersoneelsNummer(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="Email"
            placeholder="Je login of e-mailadres"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="Wachtwoord"
            placeholder="Wachtwoord"
            value={Wachtwoord}
            onChange={(event) => setWachtwoord(event.target.value)}
          />
        </div>
            <div className="form-actions">
            <a href="#">Wachtwoord vergeten?</a>
            <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
