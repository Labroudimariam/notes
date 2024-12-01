import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsConnected }) => {
    const [cin, setCin] = useState('N412108');
    const [password, setPassword] = useState('123456');
    const [data, setData] = useState({});
    const [response, setResponse] = useState({})

    const storeData = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post("https://notes.devlop.tech/api/login", {
                cin,
                password,
            });

            console.log("Response Data:", resp.data);
            setResponse(resp)

            setData({ cin, password });
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('data', JSON.stringify({ cin, password }));

            console.log("Stored Data:", { cin, password });

            setIsConnected(true)


        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            {!data.cin ?
                <form className="login-form" onSubmit={storeData}>
                    <label>CIN:</label>
                    <input type="text" value={cin} onChange={(e) => setCin(e.target.value)} />
                    <br />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit">Login</button>
                </form>
                :
                <div>
                    <p>{data.cin}</p>
                    <p>{response.data.user.first_name}</p>
                    <p>{response.data.user.last_name}</p>
                </div>
            }
        </>
    );
};

export default Login;
