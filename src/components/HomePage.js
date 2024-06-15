import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import profilePic from './assets/basic-pfp.jpeg'; // Import the profile picture

const HomePage = ({ user }) => {
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
    <div className="container">
      <div className="header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="contact-info">
          <h2>Gebruiker</h2>
          <p>tel: +31 123 12 12</p>
          <p>mail: gebruiker@gmail.com</p>
          <p>specialisatie: gebruiker</p>
        </div>
      </div>
      <div className="notes-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Zoek notities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-primary fetch-button" onClick={handleFetchNotes}>Zoeken</button>
        </div>
        <div className="notes-container">
          <h3>Kies een notitie</h3>
          <div className="notes-list">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-item">
                <p>{note.date} &gt; {note.description}</p>
                <button type="button" className="btn btn-danger" onClick={() => deleteNote(note.id)}>Verwijderen</button>
              </div>
            ))}
          </div>
          <div className="notes-input">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
