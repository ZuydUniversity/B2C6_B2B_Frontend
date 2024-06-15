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
          {/* Route for the login page */}
          <Route path="/" element={<Loginpage />} />

          {/* Route for the patient list page */}
          <Route path="/patients" element={<PatientList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

