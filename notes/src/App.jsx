import { useState, useEffect } from "react";
import "./App.css";
import NodeInput from "./NoteInput";
import NoteDisplay from "./NoteDisplay";

function App() {
  const [notes, updateNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   if (text.trim() === "") {
  //     return;
  //   }

  //   const note = {
  //     id: crypto.randomUUID(),
  //     content: text
  //   }

  //   updateNotes(notes => [...notes, note]);

  // }

  function addNotes(content) {
    const note = {
      id: crypto.randomUUID(),
      content: content
    };

    updateNotes([...notes, note]);
  }

  function deleteNotes(id) {
    const newNote = notes.filter(
      note => note.id != id
    )

    updateNotes(newNote);
  }
  
  async function loadNotes() {
    setLoading(true);
    setError("");


    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error("Failed to retrieve notes");
      }
      const data = await response.json();
      
      const loadedNotes = data.map(note => {
        return {id:note.id, content:note.title};
      });
  
      updateNotes(loadedNotes);
    }
    catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    loadNotes();
  }, []);
  
  return (
    <div>
      {/* <button onClick={() => updateNotes([])}>Clear</button> */}
      <button disabled={loading} 
      onClick={() => loadNotes()}>{loading? "Loading" : "load notes"}</button>

      {error && <p>{error}</p>}

      {/* <button onClick={loadNotes}>Load Notes</button> */}

      {/* <form onSubmit={handleSubmit}>
        <input 
          onChange={(event) => updateText(event.target.value)}
          value={text}
          placeholder="Enter a note"
        />
        <button type="submit">Submit</button>
      </form> */}

      <NodeInput onaddNodes={addNotes}/>
      <NoteDisplay notes={notes} onDeleteNote={deleteNotes}/>

        
{/* 
      {
        notes.length === 0 ?
        <p>No note</p> :
        notes.map(note => (
          <div key={note.id}>
        <NoteCard content={note.content} />
        <button onClick={() => updateNotes(notes.filter((n) => n.id != note.id))}>Delete</button>
        </div>
      ) */}
      {/* )
      } */}
    </div>
  )


}

export default App;