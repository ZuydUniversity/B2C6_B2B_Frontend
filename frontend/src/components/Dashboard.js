import React from 'react';
import './Dashboard.css'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <Link to="/Homepage">
        <img className="logo" src="JDB-logo.png" alt="JDB-logo" />
      </Link>

      {/* Top row */}
      <div className="icon-container">
        <div className="icon">
          <img src="\icons\kalender.png" alt="Kalender" />
          <span>Kalender</span>
        </div>
        <div className="icon">
          <Link to="/patients">
            <img src="\icons\resultaten.png" alt="Resultaten" />
          </Link>
          <span>Resultaten</span>
        </div>
        <div className="icon">
          <Link to="/patientList">
            <img src="\icons\patienten.png" alt="Patiëntenoverzicht" />
          </Link>
          <span>Patiëntenoverzicht</span>
        </div>

      {/* Bottom row   */}
      </div>
      <div className="icon-container">
        <div className="icon">
          <img src="\icons\toevoegen.png" alt="Afspraak toevoegen" />
          <span>Afspraak toevoegen</span>
        </div>
        <div className="icon">
        <Link to="/Settings">
          <img src="\icons\instellingen.png" alt="Instellingen" />
          </Link>
          <span>Instellingen</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;