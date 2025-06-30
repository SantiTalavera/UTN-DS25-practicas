import { useState , useEffect } from 'react' ;
// Custom Hook para manejar peticiones HTTP
export function useFetch (url) {
    const [datos, setDatos ] = useState (null);
    const [cargando , setCargando ] = useState (true);
    const [error, setError ] = useState (null);
        useEffect (() => {
            const obtenerDatos = async () => {
                try {
                    setCargando (true);
                    setError (null);
                    const response = await fetch(url);
                    if (!response .ok) {
                        throw new Error('Error en la petición' );
                    }
                    const resultado = await response .json();
                    setDatos (resultado );
                } catch (error) {
                    setError (error.message );
                } finally {
                    setCargando (false);
                }
        };
            obtenerDatos ();
    }, [url]);
    return { datos, cargando , error };
}