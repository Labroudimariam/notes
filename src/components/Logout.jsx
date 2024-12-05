import React from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Logout = ({ className, setIsConnected }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const resp = await axios.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 200) {
        localStorage.removeItem("token");
        setIsConnected(false);
        navigate("/login"); 
      } else {
        console.error("Error: Could not log out properly");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
