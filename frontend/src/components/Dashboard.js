import React from 'react';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="icon-container">
        <div className="icon">
          <img src="\icons\kalender.png" alt="Kalender" />
          <span>Kalender</span>
        </div>
        <div className="icon">
          <img src="\icons\resultaten.png" alt="Resultaten" />
          <span>Resultaten</span>
        </div>
        <div className="icon">
          <img src="\icons\patienten.png" alt="Patiëntenoverzicht" />
          <span>Patiëntenoverzicht</span>
        </div>
      </div>
      <div className="icon-container">
        <div className="icon">
          <img src="\icons\toevoegen.png" alt="Afspraak toevoegen" />
          <span>Afspraak toevoegen</span>
        </div>
        <div className="icon">
          <img src="\icons\instellingen.png" alt="Instellingen" />
          <span>Instellingen</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;