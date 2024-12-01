import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import List from "./components/List";
import Login from "./components/login";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import Logout from "./components/Logout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <List /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-note"
          element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-note/:id"
          element={isAuthenticated ? <EditNote /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
