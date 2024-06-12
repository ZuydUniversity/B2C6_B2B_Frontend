import React from 'react';
<<<<<<< Updated upstream:src/App.js
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Login';
>>>>>>> Stashed changes:frontend/src/App.js
import PatientList from './components/PatientList';

function App() {
  return (
<<<<<<< Updated upstream:src/App.js
    <div className="App">
      <PatientList />
    </div>
=======
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/patients" element={<PatientList />} />
        </Routes>
      </div>
    </Router>
>>>>>>> Stashed changes:frontend/src/App.js
  );
}

export default App;
