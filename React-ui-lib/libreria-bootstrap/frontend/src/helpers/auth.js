// Manejo simple de token en localStorage (para la práctica)
const KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function saveAuth({ token, user }) {
  localStorage.setItem(KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user ?? null));
}

export function getToken() {
  return localStorage.getItem(KEY) || null;
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(USER_KEY);
}

// Utilidad para verificar expiración de un JWT (sin librerías)
export function isTokenExpired(token) {
  try {
    const [, payloadB64] = token.split('.');
    if (!payloadB64) return true;
    const payloadJson = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (!payloadJson.exp) return false; // si no tiene exp, asumimos no expira
    const now = Date.now() / 1000;
    return payloadJson.exp < now;
  } catch {
    return true;
  }
}
