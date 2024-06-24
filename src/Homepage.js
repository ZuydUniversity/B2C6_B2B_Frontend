<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import profilePic from './assets/image.png'; // Make sure to have a profile picture

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

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
      <header className="header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="contact-info">
          <h2>Rik Goedelen</h2>
=======
// src/Homepage.js
import React from 'react';
import './Homepage.css'; // We'll create this file next for styling

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <img src="path_to_logo_image" alt="JDB Logo" />
        </div>
        <div className="header-text">
          <h1>Hallo, Mr. Goedelen</h1>
        </div>
      </header>

      <div className="profile">
        <img src="path_to_profile_image" alt="Rik Goedelen" className="profile-img" />
        <div className="profile-info">
          <p>Rik Goedelen</p>
>>>>>>> Stashed changes
          <p>tel: +3149731949</p>
          <p>mail: fysiobijgoedelen@gmail.com</p>
          <p>specialisatie: Manuele Therapie - Fysio</p>
        </div>
<<<<<<< Updated upstream
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
        <div className="search">
          <input
            type="text"
            placeholder="Afspraak zoeken ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary fetch-button" onClick={handleFetchNotes}>Zoeken</button>
        </div>
      </main>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById("myModal").style.display = "none"}>&times;</span>
          <p>Modal content goes here.</p>
=======
      </div>

      <div className="notes">
        <h2>Kies een notitie</h2>
        <div className="notes-list">
          <div className="note-item">Maandag 15-08  Joep Doe</div>
          <div className="note-item">Woensdag 09-07  Elisa van Winkel</div>
          <div className="note-item">Woensdag 09-07  Joep Doe</div>
          <div className="note-item">Maandag 15-06  Karel van Stad</div>
          <div className="note-item">Woensdag 26-04  Joep Doe</div>
          <div className="note-item">Maandag 15-01  Elisa van Winkel</div>
        </div>
        <button className="add-note">Toevoegen</button>
      </div>

      <div className="calendar">
        <h2>Volledige kalender</h2>
        <div className="calendar-widget">
          {/* You can use a calendar library or custom code here */}
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default Homepage;
=======
export default Homepage;
>>>>>>> Stashed changes
