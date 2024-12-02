import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
