import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'voornaam', direction: 'ascending' });

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

  return (
    <div>
      <h1>Patient List</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortPatients('voornaam')}>Voornaam</th>
            <th onClick={() => sortPatients('achternaam')}>Achternaam</th>
            <th onClick={() => sortPatients('geboortedatum')}>Geboortedatum</th>
            <th onClick={() => sortPatients('geslacht')}>Geslacht</th>
            <th onClick={() => sortPatients('diagnose')}>Diagnose</th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.voornaam}</td>
              <td>{patient.achternaam}</td>
              <td>{patient.geboortedatum}</td>
              <td>{patient.geslacht}</td>
              <td>{patient.diagnose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
