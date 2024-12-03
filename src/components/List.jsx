import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import Logout from "./Logout";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get('/notes');
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
        alert("Note deleted successfully!");
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <>
      <h1>Notes List</h1>
      <Link to="/add-note">
        <button>Add New Note</button>
      </Link>
      <Logout />
      <Link to="/update-password">
        <button>update password</button>
      </Link>
      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list && list.length > 0 ? (
            list.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>
                  <Link to={`/edit-note/${note.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No notes available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default List;
