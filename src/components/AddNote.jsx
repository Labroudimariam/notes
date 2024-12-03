import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  


  const addNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/notes", 
        { title, content},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Note added successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding note:", error);
      alert("There was an error adding the note. Please try again.");
    }
  };

  return (
    <form onSubmit={addNote}>
      <h2>Add Note</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
