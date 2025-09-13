import { useEffect, useState } from 'react';
import { getToken, isTokenExpired, clearAuth } from '../helpers/auth';

// options: { auth?: boolean, method?, headers?, body? }
export function useFetch(url, options = {}) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();

    (async () => {
      try {
        setCargando(true); setError(null);

        const headers = new Headers(options.headers || {});
        if (options.auth) {
          const token = getToken();
          if (!token || isTokenExpired(token)) {
            clearAuth();
            throw new Error('Token no proporcionado'); // el front lo mostrará o redirigirá
            setCargando(false);
            return
          }
          headers.set('Authorization', `Bearer ${token}`);
        }

        const res = await fetch(url, { ...options, headers, signal: ctrl.signal });
        const isJson = (res.headers.get('content-type') || '').includes('application/json');
        const body = isJson ? await res.json() : await res.text();

        if (res.status === 401) {
          setError((body && body.message) || 'No autorizado');
          return;
        }

        if (!res.ok) {
          const msg = typeof body === 'string' ? body : body?.message || `HTTP ${res.status}`;
          throw new Error(msg);
        }

        setDatos(body);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message || 'Error de red');
      } finally {
        if (!ctrl.signal.aborted) setCargando(false);
      }
    })();

    return () => ctrl.abort();
  }, [url]); // mantener simple; si pasás options dinámicas, agregá un "key" estable

  return { datos, cargando, error };
}
