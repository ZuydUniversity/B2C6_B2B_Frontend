import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Sidepanel from './sidepanel';
import { Link } from 'react-router-dom';


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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
