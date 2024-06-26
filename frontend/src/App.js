import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Login';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import ResultDetails from './components/ResultDetails';
import Patientprofile from './components/Patientprofile';
import Settings from './components/Settings'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route voor de inlogpagina */}
                    <Route path="/" element={<Loginpage />} />

                    {/* Route voor het Homepage */}
                    <Route path="/Homepage" element={<Homepage />} />

                    {/* Route voor het dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Route voor de lijst met patiënten */}
                    <Route path="/patientList" element={<PatientList />} />

                    {/* Route voor individuele patiëntendetails */}
                    <Route path="/patient-profile/:id" element={<Patientprofile />} />

                    {/* Route voor resultaatdetails */}
                    <Route path="/resultDetails" element={<ResultDetails />} />

                    {/* Route voor settings */}
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
