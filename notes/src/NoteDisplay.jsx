import NoteCard from "./NoteCard";

function NoteDisplay({notes, deleteNote}) {
    return (
        <>
        {
            notes.map((note) => {
                return <>
                <NoteCard 
                        key={note.id}
                        content={note.content}
                        />

                <button onClick={() => deleteNote(note.id)}>Delete</button>
                </>
            })
            
        }
        </>
    )
}

export default NoteDisplay;