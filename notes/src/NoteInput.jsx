

function NoteInput({handleSubmit, text, setText}) {
    return (
        <>
    <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter your note"
          />
          <button type="submit">Submit</button>
    </form>
        </>
    )
}

export default NoteInput;