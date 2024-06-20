import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PatientList.css'; // Voeg deze regel toe voor aangepaste CSS

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'voornaam', direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/patients')
            .then(response => {
                console.log('Data fetched from API:', response.data);
                setPatients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the patients!', error);
            });
    }, []);

    const sortPatients = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedPatients = [...patients].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });


    const Dropdown = ({ label, options, onSelect }) => {
        return (
            <select value={sortConfig.key} onChange={(e) => onSelect(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <div>
            <h1>Patiënten Overzicht</h1>
            <div>
                <Link to="/patient-profile/:id" className="button-link">
                    Ga naar Patientprofiel Pagina
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            <Dropdown
                                label="Sort By"
                                options={[
                                    { value: 'voornaam', label: 'Voornaam' },
                                    { value: 'achternaam', label: 'Achternaam' },
                                    { value: 'geboortedatum', label: 'Geboortedatum' },
                                    { value: 'geslacht', label: 'Geslacht' },
                                    { value: 'diagnose', label: 'Diagnose' }
                                ]}
                                onSelect={(selectedKey) => sortPatients(selectedKey)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPatients.map((patient) => (
                        <tr key={patient.id} className="patient-row">
                            <td className="patient-cell">{patient.voornaam}</td>
                            <td className="patient-cell">{patient.achternaam}</td>
                            <td className="patient-cell">{patient.geboortedatum}</td>
                            <td className="patient-cell">{patient.geslacht}</td>
                            <td className="patient-cell">{patient.diagnose}</td>
                            <td className="patient-cell">
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
