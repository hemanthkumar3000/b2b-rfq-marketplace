import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/auth';
import { decodeJWT } from '../utils/jwt';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = decodeJWT(token);
      if (payload && payload.sub && payload.role) {
        setUser({
          id: payload.sub,
          email: payload.email || '',
          role: payload.role,
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    const token = data.access_token;
    localStorage.setItem('token', token);
    const payload = decodeJWT(token);
    const userObj = {
      id: payload.sub,
      email: payload.email || '',
      role: payload.role,
    };
    setUser(userObj);
    return userObj;
  };

  const register = async (payload) => {
    return await registerApi(payload);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};