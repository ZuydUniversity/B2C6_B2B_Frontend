import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ResultDetails from './ResultDetails';

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

  return (
    <div className="App">
      <header className="header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />
        <div className="contact-info">
          <h2>Rik Goedelen</h2>
          <p>tel: +3149731949</p>
          <p>mail: fysiobijgoedelen@gmail.com</p>
          <p>specialisatie: Manuele Therapie - Fysio</p>
        </div>
      </header>
      <main className="main-content">
        <div className="notities">
          <h3>Kies een notitie</h3>
          <ul>
            {results.map((result) => (
              <li key={result.id} onClick={() => viewResult(result.id)}>
                {new Date(result.date).toLocaleDateString('nl-NL', { weekday: 'long', day: '2-digit', month: '2-digit' })}  {result.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="toevoegen">
          <h3>Toevoegen</h3>
          {/* Example static entries for "Toevoegen" section */}
          <ul>
            <li>Maandag 15-06  Karel van Stad</li>
            <li>Woensdag 26-04  Joep Doe</li>
            <li>Maandag 15-01  Elisa van Winkel</li>
          </ul>
        </div>
        <div className="search">
          <input type="text" placeholder="Afspraak zoeken ..." />
        </div>
      </main>

      {selectedResult && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ResultDetails resultId={selectedResult.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
