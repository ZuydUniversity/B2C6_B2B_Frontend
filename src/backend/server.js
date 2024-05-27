const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'notes_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API route to add a note
app.post('/add-note', (req, res) => {
  const description = req.body.description;
  if (!description) {
    return res.status(400).json({ error: 'Note description is required' });
  }
  const query = 'INSERT INTO notes (data) VALUES (?)';
  db.query(query, [description], (err, result) => {
    if (err) {
      console.error('Error saving note:', err);
      return res.status(500).json({ error: 'Failed to save note' });
    }
    res.status(201).json({ id: result.insertId, description: description, date: new Date() });
  });
});

// API route to delete a note
app.delete('/delete-note/:id', (req, res) => {
  const noteId = req.params.id;
  const query = 'DELETE FROM notes WHERE id = ?';
  db.query(query, [noteId], (err, result) => {
    if (err) {
      console.error('Error deleting note:', err);
      return res.status(500).json({ error: 'Failed to delete note' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
