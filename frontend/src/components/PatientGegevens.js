import React, { useState, useEffect } from 'react';
import './PatientGegevens.css'; 

function App() {
    const [patient, setPatient] = useState({});
    const [medication, setMedication] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('/api/patient')
            .then(response => response.json())
            .then(data => setPatient(data));

        fetch('/api/medication')
            .then(response => response.json())
            .then(data => setMedication(data));
    }, []);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Save changes to backend
            fetch('/api/patient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });

            fetch('/api/medication', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medication),
            });
        }
    };

    const handlePatientChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setPatient(prevPatient => {
                const newPatient = { ...prevPatient };
                newPatient[keys[0]] = {
                    ...newPatient[keys[0]],
                    [keys[1]]: value
                };
                return newPatient;
            });
        } else {
            setPatient(prevPatient => ({ ...prevPatient, [name]: value }));
        }
    };

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;
        setMedication(prevMedication => {
            const newMedication = [...prevMedication];
            newMedication[index][name] = value;
            return newMedication;
        });
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Patiëntgegevens</h1>
                <button className="edit-button" onClick={handleEdit}>
                    {isEditing ? 'Opslaan' : 'Aanpassen'}
                </button>
            </div>

            <div className="section">
                <div className="section-header">
                    <h2>Patiënt</h2>
                </div>
                <div className="section-content">
                    <div className="patient-info">
                        <p><strong>Naam:</strong> {isEditing ? <input type="text" name="name" value={patient.name || ''} onChange={handlePatientChange} /> : patient.name}</p>
                        <p><strong>Voornaam:</strong> {isEditing ? <input type="text" name="first_name" value={patient.first_name || ''} onChange={handlePatientChange} /> : patient.first_name}</p>
                        <p><strong>Leeftijd:</strong> {isEditing ? <input type="text" name="age" value={patient.age || ''} onChange={handlePatientChange} /> : patient.age}</p>
                        <p><strong>Geslacht:</strong> {isEditing ? <input type="text" name="gender" value={patient.gender || ''} onChange={handlePatientChange} /> : patient.gender}</p>
                        <p><strong>Diagnose:</strong> {isEditing ? <input type="text" name="diagnosis" value={patient.diagnosis || ''} onChange={handlePatientChange} /> : patient.diagnosis}</p>
                    </div>
                    <div className="contact-info">
                        <h2 className="sub-section-header">Contactpersoon</h2>
                        <p><strong>Naam:</strong> {isEditing ? <input type="text" name="contact.name" value={patient.contact?.name || ''} onChange={handlePatientChange} /> : patient.contact?.name}</p>
                        <p><strong>Telefoonnummer:</strong> {isEditing ? <input type="text" name="contact.phone" value={patient.contact?.phone || ''} onChange={handlePatientChange} /> : patient.contact?.phone}</p>
                        <p><strong>E-mailadres:</strong> {isEditing ? <input type="text" name="contact.email" value={patient.contact?.email || ''} onChange={handlePatientChange} /> : patient.contact?.email}</p>
                    </div>
                </div>
            </div>

            <div className="section medication-list">
                <div className="section-header">
                    <h2>Medicatie</h2>
                </div>
                <div className="section-content medication-grid">
                    {medication.length > 0 ? (
                        medication.map((med, index) => (
                            <div key={index} className="medication-item">
                                <p><strong>Medicijn:</strong> {isEditing ? <input type="text" name="name" value={med.name} onChange={(e) => handleMedicationChange(index, e)} /> : med.name}</p>
                                <p><strong>Gebruik:</strong> {isEditing ? <input type="text" name="use" value={med.use} onChange={(e) => handleMedicationChange(index, e)} /> : med.use}</p>
                            </div>
                        ))
                    ) : (
                        <p>Geen medicatiegegevens beschikbaar.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
