import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Ensure key matches stored token
    if (token) {
      setUser(token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("access_token"); // Match key name
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
