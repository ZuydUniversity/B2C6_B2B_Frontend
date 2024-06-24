// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Login';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import Patients from './components/Patients';
import ResultDetails from './components/ResultDetails';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the login page */}
          <Route path="/" element={<Loginpage />} />

          {/* Route for the components */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patientList" element={<PatientList />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/resultDetails" element={<ResultDetails />} />
          <Route path="/settings" element={<Settings />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

