import { useState } from "react";

function NodeInput({onaddNodes}) {
  const [text, updateText] = useState("");



  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === "") {
      return;
    }

    onaddNodes(text);
  }

  return (
    <form onSubmit={handleSubmit}>
        <input 
          onChange={(event) => updateText(event.target.value)}
          value={text}
          placeholder="Enter a note"
        />
        <button type="submit">Submit</button>
    </form> 
  )
}

export default NodeInput