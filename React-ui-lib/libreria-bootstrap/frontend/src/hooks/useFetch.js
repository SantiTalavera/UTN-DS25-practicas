import { useState, useEffect } from 'react';

export function useFetch(url, options) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();

    (async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(url, { ...(options || {}), signal: ctrl.signal });
        const contentType = res.headers.get('content-type') || '';

        const body = contentType.includes('application/json')
          ? await res.json()
          : await res.text();

        if (!res.ok) {
          const msg = typeof body === 'string' ? body : (body?.message || `HTTP ${res.status}`);
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
  }, [url]); // si pasás options dinámicas, agregá una clave estable

  return { datos, cargando, error };
}
