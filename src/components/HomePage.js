import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';

/**
 * @typedef {import('./types/note').Note} Note
 */

const HomePage = ({ user }) => {
  const [notes, setNotes] = useState(user.notes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteFormHeight, setNoteFormHeight] = useState(0);
  const [notesContainerMarginTop, setNotesContainerMarginTop] = useState(10);

  const noteFormRef = useRef(null);

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  useEffect(() => {
    if (noteFormRef.current) {
      setNoteFormHeight(noteFormRef.current.clientHeight);
    }
  }, [showNoteForm]);

  const deleteNote = async (id) => {
    await fetch(`/delete-note/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const noteDescription = event.target.note.value;
    const response = await fetch('/add-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: noteDescription })
    });
    const newNoteData = await response.json();
    setNotes([...notes, newNoteData]);
    setNewNote('');
    setShowNoteForm(false);
  };

  const handleFetchNotes = async () => {
    try {
      const response = await fetch('/fetch-notes');
      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div className="container">
      <h1 align="center" style={{ color: '#2596be' }}>Notities</h1>
      <h2 align="center" style={{ color: '#2596be' }}>Op deze pagina kan je alle notities bijhouden.</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Zoek notities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary fetch-button" onClick={handleFetchNotes}>Zoeken</button>
      <p align="center" style={{ color: '#2596be' }}>Datum: {currentDate}</p>
      <div className="notes-container" style={{ marginTop: `${notesContainerMarginTop}px` }}>
        <div className="notes-list">
          <h3>Notities</h3>
          <div className="notes">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-item">
                <p>{note.description}</p>
                <p>{note.date}</p>
                <button type="button" className="btn btn-danger" onClick={() => deleteNote(note.id)}>Verwijderen</button>
              </div>
            ))}
          </div>
        </div>
        {showNoteForm && (
          <div className="notes-input" ref={noteFormRef}>
            <form onSubmit={handleFormSubmit} className="note-form">
              <textarea
                name="note"
                id="note"
                className="form-control"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                required
              ></textarea>
              <br />
              <div align="center">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#2596be' }}>Notitie toevoegen</button>
              </div>
            </form>
          </div>
        )}
        {!showNoteForm && (
          <button className="btn btn-primary" onClick={() => setShowNoteForm(true)}>Voeg notitie toe</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
