import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Login';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import ResultDetails from './components/ResultDetails';
import Patientprofile from './components/Patientprofile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route voor de inlogpagina */}
                    <Route path="/" element={<Loginpage />} />

                    {/* Route voor het dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Route voor de lijst met patiënten */}
                    <Route path="/patientList" element={<PatientList />} />

                    {/* Route voor individuele patiëntendetails */}
                    <Route path="/patient-profile/:id" element={<Patientprofile />} />

                    {/* Route voor resultaatdetails */}
                    <Route path="/resultDetails" element={<ResultDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
