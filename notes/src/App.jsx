import { useState, useEffect } from "react";
import "./App.css";
import NoteDisplay from "./NoteDisplay";
import NoteInput from "./NoteInput";

const API_URL = import.meta.env.VITE_API_URL;

// function NoteCard({content}) {
//   return (
//     <h1>{content}</h1>
//   );
// }

function App() {
  const [text, setText] = useState("");
  const [notes, updateNotes] = useState([]);
  
  useEffect(() => {
    async function loadNotes() {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();
      updateNotes(data);
    }

    loadNotes();
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === "") return;

    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ content: text }),
    });

    const note = await response.json();

    updateNotes(prevNotes => [...prevNotes, note]);
  }

  async function clearNotes() {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: "DELETE"
      })
      if (!response.ok) throw new error("Fail to add new notes");
      updateNotes([]);
    }
    catch (error) {
      alert("Unable to delete notes");
    }
  }

  async function deleteNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {method:"DELETE"});
      if (!response.ok) {
        throw new error("Unable to delete note")
      }
      updateNotes(prevNotes => prevNotes.filter(note => note.id != id));
    }
    catch (error) {
      alert("Could not delete note");
    }
  }


  return (
    <>
      <h1>My Notes</h1>
      <button onClick={clearNotes}>Clear</button>
      {/* <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter your note"
          />
          <button type="submit">Submit</button>
      </form> */}
      <NoteInput 
        handleSubmit={handleSubmit}
        text={text}
        setText={setText}
      />
      <NoteDisplay
        notes={notes}
        deleteNote={deleteNote}
      />
    </>
  )
}

export default App;