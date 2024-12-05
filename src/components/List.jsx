import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import "./list.css";
import Navbar from "./Navbar";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("/notes");
      setList(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setList([]);
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`/notes/${id}`);
        setList(list.filter((note) => note.id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="list">
      <Navbar />

      <div className="cards">
        {list && list.length > 0 ? (
          list.map((note) => (
            <div className="card" key={note.id}>
              <p className="card-title">
                <strong>{note.title}</strong>
              </p>
              <p className="card-content">{note.content}</p>
              <p>
                <Link to={`/edit-note/${note.id}`}>
                  <button className="card-btn-edit">Edit</button>
                </Link>
                <button
                  className="card-btn-delete"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </p>
            </div>
          ))
        ) : (
          <div className="card" colSpan="3">
            No notes available.
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
