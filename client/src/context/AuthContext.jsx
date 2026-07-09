import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('sp_token');
    if (savedToken) setToken(savedToken);
    setLoading(false);
  }, []);

  const login = (newToken) => {
    sessionStorage.setItem('sp_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem('sp_token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}