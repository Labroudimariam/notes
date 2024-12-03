import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';  

const Login = ({ setIsConnected }) => {
  const [cin, setCin] = useState('N412108');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();  

  const StoreData = async () => {
    try {
      const resp = await axios.post('/login', { cin, password });

      if (resp.token) {
        localStorage.setItem('token', resp.token); 
        setIsConnected(true);  
        navigate('/');  
      } else {
        console.error('Login failed, token not returned.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div >
      <div >
        <div >
          <h2 >Login</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="CIN"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={StoreData}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
