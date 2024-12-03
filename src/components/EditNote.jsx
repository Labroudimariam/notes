import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(`/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(resp);
        
        setTitle(resp.title);
        setContent(resp.content);
        setOriginalTitle(resp.title);
        setOriginalContent(resp.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchNote();
  }, [id]);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Note updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating note:", error);
      alert("There was an error updating the note.");
    }
  };

  const cancelEdit = () => {
    setTitle(originalTitle);
    setContent(originalContent);
    navigate("/"); 
  };

  return (
    <form onSubmit={updateNote}>
      <h2>Edit Note</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button type="submit">Update Note</button>
      <button type="button" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default EditNote;
