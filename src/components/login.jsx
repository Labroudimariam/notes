import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Login = ({ setIsConnected }) => {
  const [cin, setCin] = useState("N412108");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const StoreData = async () => {
    try {
      const resp = await axios.post("/login", { cin, password });

      if (resp.token) {
        localStorage.setItem("token", resp.token);
        setIsConnected(true);
        navigate("/");
      } else {
        console.error("Login failed, token not returned.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                className="input-cin"
                type="text"
                placeholder="Cin"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />

              <FaUser className="icon-login" />
            </div>
            <div className="form-group">
              <input
                className="input-pwd"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <FaLock className="icon-login" />
            </div>
            <button className="btn-login" type="button" onClick={StoreData}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
