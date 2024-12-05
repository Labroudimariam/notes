import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Select from "react-select";
import "./addNote.css";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        console.log("Users fetched:", response);
        setUsers(response);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/notes",
        {
          title,
          content,
          shared_with: selectedUsers.map((user) => user.value),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      navigate("/");
    } catch (error) {
      console.error("Error adding note:", error);

    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "40px",
      color: "#fff",
      fontSize: "16px",
      padding: "5px 15px",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#503752",
      borderRadius: "12px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgba(255, 255, 255, 0.2)"
        : "transparent",
      color: "#fff",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#885889",
      borderRadius: "20px",
      color: "#fff",
      padding: "5px 10px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#fff",
      backgroundColor: "transparent",
    }),
    multiValueRemoveHover: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    }),
  };

  return (
    <div className="addNote-container">
      <h2 className="addNote-title">Add Note</h2>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
        />
        <Select
          isMulti
          options={users.map((user) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          }))}
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Select users to share with"
          styles={customStyles}
        />
        <button type="submit" className="add-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddNote;
