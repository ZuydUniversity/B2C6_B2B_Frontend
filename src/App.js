<<<<<<< Updated upstream
import React from 'react';
import Homepage from './Homepage'; // Zorg ervoor dat het pad naar je Homepage.js correct is

const App = () => {
  return (
    <div className="App">
      <Homepage />
    </div>
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ResultDetails from './ResultDetails';
import HomePage from './Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OtherComponent from './OtherComponent'; 

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const viewResult = async (resultId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/results/${resultId}`);
      console.log(response.data); // Log de ontvangen data
      setSelectedResult(response.data);
      document.getElementById("myModal").style.display = "block";
    } catch (error) {
      console.error('Error fetching result details:', error);
    }
  };

  const deleteResult = async (resultId) => {
    if (window.confirm('Weet je zeker dat je dit resultaat wilt verwijderen?')) {
      try {
        await axios.delete(`http://localhost:5000/api/results/${resultId}`);
        fetchResults();
      } catch (error) {
        console.error('Error deleting result:', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedResult(null);
    document.getElementById("myModal").style.display = "none";
  };

  




function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/other" component={OtherComponent} />
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}
  
};

export default App;