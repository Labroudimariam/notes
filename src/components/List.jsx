import React, { useEffect, useState } from 'react';
import axios from 'axios';


const List = ({ setIsConnected }) => {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.get("https://notes.devlop.tech/api/notes", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setList(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsConnected(false);
    };

    const addOrUpdateNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            let resp;
            if (isEditMode) {
                resp = await axios.put(
                    `https://notes.devlop.tech/api/notes/${currentNote.id}`,
                    { title, content },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );
                
                setList(list.map((note) => note.id === currentNote.id ? resp.data : note));
                setIsEditMode(false); 
                setCurrentNote(null);
            } else {
                
                resp = await axios.post(
                    "https://notes.devlop.tech/api/notes",
                    { title, content },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );
                setList([...list, resp.data]);
            }

            setTitle(''); 
            setContent(''); 
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            setList(list.filter((note) => note.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const editNote = (note) => {
        setIsEditMode(true);
        setCurrentNote(note);
        setTitle(note.title); 
        setContent(note.content);  
    };

    const cancelEdit = () => {
        setIsEditMode(false);
        setCurrentNote(null);
        setTitle('');
        setContent('');
    };

    return (
        <>
            <div className="header">
                <h1>List Page</h1>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <div>
                <h2>{isEditMode ? 'Edit Note' : 'Add Notes'}</h2>
                <form onSubmit={addOrUpdateNote}>
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
                    ></textarea>
                    <br />
                    <button type="submit">{isEditMode ? 'Update Note' : 'Add Note'}</button>
                    {isEditMode && (
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                    )}
                </form>
            </div>

            <div className="table-container">
                <h2>Notes List</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>
                                    <button className="update" onClick={() => editNote(item)}>
                                        Update
                                    </button>
                                    <button className="delete" onClick={() => deleteNote(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default List;
