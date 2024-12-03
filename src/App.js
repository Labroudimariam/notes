import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/login';
import List from './components/List';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import Logout from './components/Logout';
import './App.css'
import UpdatePassword from './components/UpdatePwd';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsConnected(true); 
    }
  }, []);


  return (
    <Routes>
      {!isConnected ? (
        <Route path="/login" element={<Login setIsConnected={setIsConnected} />} />
      ) : (
        <>
          <Route path="/" element={<List setIsConnected={setIsConnected} />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/logout" element={<Logout setIsConnected={setIsConnected} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
