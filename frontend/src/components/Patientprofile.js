import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patientprofile.css';
import { useParams } from 'react-router';

const PatientProfile = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        if (id === 'simulated') {
            // Simulated patient data
            const simulatedPatient = {
                name: "Joep Doe",
                phone: "+3264981949",
                email: "joepdoetmail@gmail.com",
                diagnosis: "Juveniele Dermatomyosites",
                profilePictureUrl: "profile-picture-url.jpg"
            };
            setPatient(simulatedPatient);
        } else {
            // Fetch real patient data from API
            axios.get(`http://localhost:5000/patients/${id}`)
                .then(response => {
                    console.log('Patient fetched:', response.data);
                    setPatient(response.data);
                })
                .catch(error => {
                    console.error('Error fetching patient details:', error);
                });
        }
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

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
                {/* Voeg hier verdere details toe */}
            </div>
            <button className="patient-data-button">Patiëntgegevens</button>
        </div>
    );
}

export default PatientProfile;
