import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
        const resp = await axios.get(
          `https://notes.devlop.tech/api/notes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTitle(resp.data.title);
        setContent(resp.data.content);
        setOriginalTitle(resp.data.title);
        setOriginalContent(resp.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [id]);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://notes.devlop.tech/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
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
