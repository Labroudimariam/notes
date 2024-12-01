import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(resp.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(list.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <>
      <h1>Notes List</h1>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-note">
        <button>Add New Note</button>
      </Link>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>
                <Link to={`/edit-note/${note.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
