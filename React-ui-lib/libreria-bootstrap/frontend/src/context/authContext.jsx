import { createContext, useState, useContext, useEffect } from 'react';
// Importamos los helpers existentes
import {
getToken,
saveAuth,
clearAuth,
parseJWT,
getUserData,
isTokenExpired
} from '../helpers/auth';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Propiedades adicionales que necesita App.jsx
  const token = getToken();
  const checking = loading;
  // Cargar usuario si ya hay token (al recargar página)
  useEffect(() => {
    const token = getToken(); // Usamos el helper
    if (token && !isTokenExpired()) {
      const userData = getUserData(); // Usamos el helper
    setUser(userData);
    } else if (token) {
      clearAuth(); // Token expirado, limpiamos
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mismo endpoint que ya usábamos
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error en login");
      }
      const { data } = await res.json();
      saveAuth(data.token); // Usamos el helper
      const userData = parseJWT(data.token); // Usamos el helper
      setUser(userData);
    } catch (error) {
      throw new Error(error.message || "Error en login");
    }
  };

  const logout = () => {
    clearAuth (); // Usamos el helper
    setUser (null);
  };

  // Verificar expiración periódicamente
  useEffect (() => {
    const interval = setInterval (() => {
      if (isTokenExpired ()) {
        logout ();
      }
    }, 60000 ); // Cada minuto
    return () => clearInterval (interval );
  }, []);

  const value = {
    user,
    token,
    checking,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isadmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    hasRole: (role) => user?.role === role,
    canAccess: () => {
      // Lógica de permisos personalizada
      if (!user) return false;
      if (user.role === 'admin') return true;
      // Agregar más lógica según su sistema
      return false;
    }
  };
    return (
      <AuthContext.Provider value ={value }>
      {children }
      </AuthContext.Provider >
    );
}

// Hook personalizado para usar el contexto
export function useAuth () {
  const context = useContext (AuthContext );
  if (!context ) {
    throw new Error ('useAuth debe usarse dentro de AuthProvider' );
  }
  return context ;
}