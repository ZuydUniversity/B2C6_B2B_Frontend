import React from 'react';
import './Patientprofile.css';

const PatientProfile = () => {
    // Dummy patientgegevens
    const patient = {
        name: "Joep Doe",
        phone: "+3264981949",
        email: "joepdoetmail@gmail.com",
        diagnosis: "Juveniele Dermatomyosites",
        profilePictureUrl: "profile-picture-url.jpg"
    };

    return (
    <div className="patient-profile">
        <div className="header">
            <div className="logo">JDB</div>
            <div className="title">Profiel van {patient.name}</div>
        </div>
        <div className="profile-picture">
            <img src={patient.profilePictureUrl} alt="Profile" />
            <div className="patient-name">{patient.name}</div>
        </div>
        <div className="patient-details">
            <div><strong>Telefoon:</strong> {patient.phone}</div>
            <div><strong>Email:</strong> {patient.email}</div>
            <div><strong>Diagnose:</strong> {patient.diagnosis}</div>
        </div>
        <button className="patient-data-button">Patientgegevens</button>

        <div className="patient-reports">
            <div className="reports-header">
                <div className="report-title">Kies je verslag</div>
                <button className="add-report-button">Voeg verslag toe</button>
            </div>
            <div className="report-list">
                <div>
                    <p>Report 20-06-2024</p>
                </div>
            </div>
            <div className="report-search">
                <input type="text" placeholder="Afspraak zoeken" />
            </div>
        </div>
    </div>
    );
}

export default PatientProfile;
