import NoteCard from "./NoteCard"

function NoteDisplay({notes, onDeleteNote}) {
  return (
    <div>
    { notes.length === 0 ? 
      <p>No notes</p>: 
      notes.map(note => (
        <div key={note.id}>
          <NoteCard content={note.content}/>
          <button onClick={() => onDeleteNote(note.id)}>Delete</button>
        </div>

      
      ))
    }
    </div>
  )

}

export default NoteDisplay