// src/context/CatalogoContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

const CatalogoContext = createContext(null);
const BASE_URL = "http://localhost:3000/api/books";

export function CatalogoProvider({ children }) {
  const { datos, cargando, error } = useFetch(BASE_URL);

  // Estado local para evitar re-fetch al agregar
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    if (!datos) return;
    // TU API: { books: [...] }
    const arr = Array.isArray(datos) ? datos : (datos.books ?? datos.data ?? []);
    const normalizados = (arr ?? []).map((b) => ({
      id: b.id ?? b._id ?? crypto.randomUUID(),
      titulo: b.titulo ?? b.title ?? "",
      autor: b.autor ?? b.author ?? "",
      img: b.img ?? b.image ?? b.imageUrl ?? "/Imagenes/placeholder.png",
      seccion: b.seccion ?? b.section ?? "",
      ...b,
    }));
    setCatalogo(normalizados);
  }, [datos]);

  const agregarLibro = async (nuevo) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Error ${res.status}: ${msg}`);
    }
    let creado;
    try {
      const body = await res.json();
      creado = Array.isArray(body) ? body[0] : body.data ?? body;
    } catch {
      creado = null;
    }
    if (!creado || (!creado.id && !creado._id)) {
      creado = { ...nuevo, id: Date.now() };
    }
    setCatalogo((prev) => [...prev, {
      id: creado.id ?? creado._id,
      titulo: creado.titulo ?? creado.title ?? "",
      autor: creado.autor ?? creado.author ?? "",
      img: creado.img ?? creado.image ?? "/Imagenes/placeholder.png",
      seccion: creado.seccion ?? creado.section ?? "",
      ...creado,
    }]);
  };

  const value = useMemo(
    () => ({ catalogo, setCatalogo, cargando, error, agregarLibro }),
    [catalogo, cargando, error]
  );

  return (
    <CatalogoContext.Provider value={value}>
      {children}
    </CatalogoContext.Provider>
  );
}

export function useCatalogo() {
  const ctx = useContext(CatalogoContext);
  if (!ctx) throw new Error("useCatalogo debe usarse dentro de <CatalogoProvider>");
  return ctx;
}
