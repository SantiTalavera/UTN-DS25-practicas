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

export function parseJWT (token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url .replace (/-/g, '+').replace (/_/g, '/');
    const jsonPayload = decodeURIComponent ( atob(base64 ).split('').map(c =>
       '%' + ('00' + c.charCodeAt (0).toString (16)).slice(-2) ). join('') );
    return JSON.parse(jsonPayload );
  } catch {
      return null;
  }
}

export function getUserData () {
  const token = getToken ();
  return token ? parseJWT (token) : null;
}

export function isTokenExpired () {
  const userData = getUserData ();
  if (!userData || !userData .exp) return true;
  return userData .exp * 1000 < Date.now();
}
