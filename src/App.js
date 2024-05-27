import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';

const App = () => {
  const user = {
    notes: [
      
    ]
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
