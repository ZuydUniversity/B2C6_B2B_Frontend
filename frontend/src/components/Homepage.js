import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Sidepanel from './sidepanel';
import { Link } from 'react-router-dom';


const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentSearchTerm, setAppointmentSearchTerm] = useState('');

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const deleteNote = async (id) => {
    await fetch(`/delete-note/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const noteDescription = newNote.trim();
    if (!noteDescription) return;
    const response = await fetch('/add-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: noteDescription })
    });
    if (response.ok) {
      const newNoteData = await response.json();
      setNotes([...notes, newNoteData]);
      setNewNote('');
    }
  };

  const handleFetchNotes = async () => {
    try {
      const response = await fetch('/fetch-notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
    const fetchAppointments = async (searchPhrase) => {
    try {
      const response = await fetch(`/homepage?searchphrase=${encodeURIComponent(searchPhrase)}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleFetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  return (
    <div className="homepage">
        <div>
            <Sidepanel/>
        </div>
        
      <header className="header">
        
      <Link to="/dashboard">
        <img className="logo" src="JDB-logo.png" alt="JDB-logo" />
      </Link>
      
      <img src="/image.png" alt="Profile" className="profile-pic" />
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
            {filteredNotes.map((note) => (
              <li key={note.id}>
                {note.date} &gt; {note.description}
                <button type="button" onClick={() => deleteNote(note.id)}>Verwijderen</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="toevoegen">
          <h3>Toevoegen</h3>
          <form onSubmit={handleFormSubmit} className="note-form">
            <textarea
              name="note"
              id="note"
              className="form-control"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Voeg hier je notitie toe..."
              required
            ></textarea>
            <br />
            <div align="center">
              <button type="submit" className="btn btn-primary">Notitie toevoegen</button>
              </div>
          </form>
        </div>
        <div className="appointments">
          <div className="search-container">
            <input
              type="text"
              placeholder="Afspraak zoeken ..."
              value={appointmentSearchTerm}
              onChange={(e) => setAppointmentSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" onClick={() => fetchAppointments(appointmentSearchTerm)}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <p>Patient: {appointment.patient_name}</p>
                <p>Appointment Date: {appointment.datetime}</p>
                <p>Doctor ID: {appointment.doctor_id}</p>
                <p>Duration: {appointment.duration} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById("myModal").style.display = "none"}>&times;</span>
          <p>Modal content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
