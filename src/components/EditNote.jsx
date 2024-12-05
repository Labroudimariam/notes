import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./editNote.css";

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
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const cancelEdit = () => {
    setTitle(originalTitle);
    setContent(originalContent);
    navigate("/");
  };

  return (
    <div className="editNote-container">
      <h2 className="editNote-title">Edit Note</h2>
      <form onSubmit={updateNote}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditNote;
