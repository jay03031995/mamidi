import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const FIXED_EMAIL = "admin@mamidi.studio";
const FIXED_PASSWORD = "mamidi123";
const STORAGE_KEY = "mamidi-dashboard-auth";

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadUserFromStorage());

  const login = (email, password) => {
    if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      const payload = { email };
      setUser(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
