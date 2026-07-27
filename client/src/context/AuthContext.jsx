import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRole = async (t) => {
    try {
      const res = await fetch('http://localhost:8080/api/account/me', {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        const r = data.role || 'STUDENT';
        setRole(r);
        return r;
      }
    } catch {
      // Backend unreachable — leave role null, pages that need it will
      // just show their own "could not load" state.
    }
    return null;
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem('sp_token');
    if (savedToken) {
      setToken(savedToken);
      loadRole(savedToken);
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    sessionStorage.setItem('sp_token', newToken);
    setToken(newToken);
    return loadRole(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem('sp_token');
    setToken(null);
    setRole(null);
  };

  const isAuthenticated = !!token;
  const isInstructor = role === 'INSTRUCTOR';

  return (
    <AuthContext.Provider value={{ token, role, isInstructor, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}