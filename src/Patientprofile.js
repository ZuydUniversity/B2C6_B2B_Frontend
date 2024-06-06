import React from 'react';
import './Patientprofile.css';

const PatientProfile = () => {
  // Simulated patient data
  const patient = {
    name: "Joep Doe",
    phone: "+3264981949",
    email: "joepdoetmail@gmail.com",
    diagnosis: "Juveniele Dermatomyosites"
  };

  return (
    <div className="patient-profile">
      <div className="header">
        <div className="logo">JDB</div>
        <div className="title">Profiel van {patient.name}</div>
      </div>
      <div className="profile-picture">
        <img src="profile-picture-url.jpg" alt="Profile" />
        <div className="patient-name">{patient.name}</div>
      </div>
      <div className="patient-details">
        <div><strong>tel:</strong> {patient.phone}</div>
        <div><strong>mail:</strong> {patient.email}</div>
        <div><strong>Diagnose:</strong> {patient.diagnosis}</div>
      </div>
      <button className="patient-data-button">Patiëntgegevens</button>
    </div>
  );
}

export default PatientProfile;
