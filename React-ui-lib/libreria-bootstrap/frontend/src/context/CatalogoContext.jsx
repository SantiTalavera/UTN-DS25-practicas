import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";

const CatalogoContext = createContext(null);
const API = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/books`;

export function CatalogoProvider({ children }) {
  // GET inicial (no re-fetch al agregar, mantenemos estado local)
  const { datos, cargando, error } = useFetch(API);
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    if (!datos) return;

    // Soporta { books, total } o { data: { books, total } }
    const payload = datos?.books ? datos : datos?.data ? datos.data : null;
    const arr = Array.isArray(payload?.books) ? payload.books : [];

    const normalizados = arr.map((b) => ({
      id: b.id ?? b._id ?? crypto.randomUUID(),
      titulo: b.titulo ?? b.title ?? "",
      // autor puede venir como string o como objeto { nombre }
      autor: typeof b.autor === "string" ? b.autor : (b.autor?.nombre ?? b.author ?? ""),
      img: b.img ?? b.image ?? b.imageUrl ?? "/Imagenes/placeholder.png",
      seccion: b.seccion ?? b.section ?? "",
    }));

    setCatalogo(normalizados);
  }, [datos]);

  // POST alineado con backend
  const agregarLibro = useCallback(async ({ titulo, img, autorId, seccion }) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, img, autorId, seccion }),
    });

    let body;
    try {
      body = await res.json();
    } catch {
      throw new Error(`Error HTTP ${res.status}`);
    }
    if (!res.ok || !body?.book) {
      // backend responde { book: BookDTO|null, message }
      throw new Error(body?.message ?? `Error HTTP ${res.status}`);
    }

    const b = body.book;
    const normalizado = {
      id: b.id,
      titulo: b.titulo ?? "",
      autor: typeof b.autor === "string" ? b.autor : (b.autor?.nombre ?? ""),
      img: b.img ?? "/Imagenes/placeholder.png",
      seccion: b.seccion ?? "",
    };

    setCatalogo((prev) => [...prev, normalizado]);
    return normalizado; // por si el caller quiere usarlo
  }, []);

  const value = useMemo(
    () => ({ catalogo, setCatalogo, cargando, error, agregarLibro }),
    [catalogo, cargando, error, agregarLibro]
  );

  return <CatalogoContext.Provider value={value}>{children}</CatalogoContext.Provider>;
}

export function useCatalogo() {
  const ctx = useContext(CatalogoContext);
  if (!ctx) throw new Error("useCatalogo debe usarse dentro de <CatalogoProvider>");
  return ctx;
}
