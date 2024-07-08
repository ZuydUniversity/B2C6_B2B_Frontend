// src/App.js

import React from 'react';
import Loginpage from './components/Login';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <Loginpage />
    </div>
=======
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import Patients from './components/Patients';
import ResultDetails from './components/ResultDetails';
import { DarkModeToggle } from './components/DarkModeToggle';

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
          <Route path="/darkModeToggle" element={<DarkModeToggle />} />

        </Routes>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;

