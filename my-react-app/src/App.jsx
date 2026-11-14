import { useState } from "react";
import "./App.css";

function NoteCard({content}) {
  return (
    <div>
      <p>content: {content}</p>
    </div>
  )
}

function App() {
  const [notes, updateNotes] = useState([]);
  const [text, updateText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (text.trim() === "") {
      return;
    }

    const note = {
      id: crypto.randomUUID(),
      content: text
    }

    updateNotes(notes => [...notes, note]);

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={(event) => updateText(event.target.value)}
          value={text}
          placeholder="Enter a note"
        />
        <button type="submit">Submit</button>
      </form>

      {
        notes.length === 0 ?
        <p>No note</p> :
        notes.map(note => <NoteCard content={note.content} />)
      }
    </div>
  )


}

export default App;