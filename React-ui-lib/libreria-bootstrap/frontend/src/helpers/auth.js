// Manejo simple de token en localStorage (para la práctica)
const KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function saveAuth(auth) {
  if (!auth) throw new Error('Token requerido');
  const { token, user = null } =
  typeof auth === 'string' ? { token: auth, user: null } : auth;

  if (!token) throw new Error('Token requerido');
  localStorage.setItem(KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  const raw = localStorage.getItem(KEY);
  if (!raw || raw === 'undefined' || raw === 'null') return null;
  return raw;
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw || raw === 'undefined') return null;
  return JSON.parse(raw);
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
  const stored = getUser();
  if (stored) return stored;
  const token = getToken();
  return token ? parseJWT(token) : null;
}

export function isTokenExpired(token = getToken()) {
  if (!token) return true;
  const payload = parseJWT(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
}
