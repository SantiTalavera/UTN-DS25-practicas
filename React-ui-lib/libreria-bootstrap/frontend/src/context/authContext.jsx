import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { saveAuth, getToken, getUser, clearAuth, isTokenExpired } from '../helpers/auth';

const AuthContext = createContext(null);
const API = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/auth/login`;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [checking, setChecking] = useState(true);

  // Rehidratar sesión al cargar / validar expiración
    useEffect(() => {
    try {
        const t = getToken()
        if (t && !isTokenExpired(t)) {
        setToken(t)
        setUser(getUser())
        } else {
        clearAuth()
        setToken(null)
        setUser(null)
        }
    } catch (e) {
        console.error('Auth bootstrap error:', e)
        clearAuth()
    } finally {
        setChecking(false)   // 👈 clave
    }
    }, [])

  const login = useCallback(async (email, password) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body?.data?.token) {
      throw new Error(body?.message ?? 'Credenciales inválidas');
    }
    const { token: tk, user: us } = body.data;
    saveAuth({ token: tk, user: us });
    setToken(tk);
    setUser(us);
    return us;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ token, user, checking, login, logout }), [token, user, checking, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
