// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Login';
import PatientList from './components/PatientList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route voor the login  */}
          <Route path="/" element={<Loginpage />} />

          {/* Route voor the patienten lijst */}
          <Route path="/patients" element={<PatientList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

