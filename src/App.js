import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [search, setSearch] = useState('');

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever 'notes' changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    if (newNote.trim()) {
      const newEntry = { id: Date.now(), text: newNote };
      setNotes([...notes, newEntry]);
      setNewNote('');
    }
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  // Filter notes based on search input
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Notes App</h1>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Add new note */}
      <div className="new-note">
        <textarea
          placeholder="Write your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows="3"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      {/* Notes List */}
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <p>{note.text}</p>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
}

export default App;

        