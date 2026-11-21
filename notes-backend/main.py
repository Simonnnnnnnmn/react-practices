from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

def initialize_db():
    conn = sqlite3.connect("notes.db")
    conn.execute("""
CREATE TABLE IF NOT EXISTS notes (
id INTEGER PRIMARY KEY,
content TEXT NOT NULL
)
""")

    conn.commit()
    conn.close();



class NoteContent(BaseModel):
    content: str

app = FastAPI()
initialize_db()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/notes")
def get_notes():
    conn = sqlite3.connect("notes.db")
    cursor = conn.execute("SELECT * FROM notes ORDER BY id;")
    data = cursor.fetchall()
    conn.close()

    return [{"id": dataum[0], "content": dataum[1]} for dataum in data]

@app.post("/notes")
def add_notes(note: NoteContent):
    conn = sqlite3.connect("notes.db")
    cursor = conn.execute("INSERT INTO notes (content) VALUES (?);", 
                (note.content,))

    conn.commit()
    conn.close()

    new_note = {
        "id": cursor.lastrowid,
        "content": note.content
    }

    return new_note


@app.delete('/notes')
def clear_notes():
    conn = sqlite3.connect("notes.db")
    conn.execute("DELETE FROM notes;")
    conn.commit()
    conn.close()
    return {"message": "successful delete"}

@app.delete('/notes/{id}')
def delete_note(id:int):
    conn = sqlite3.connect("notes.db")
    conn.execute("DELETE FROM notes where id = ?;", (id,))
    conn.commit()
    conn.close()
    return {"message": f"Delete note {id} successfully"}