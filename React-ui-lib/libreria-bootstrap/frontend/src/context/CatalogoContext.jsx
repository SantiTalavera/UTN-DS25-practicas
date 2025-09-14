import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { getToken } from "../helpers/auth";

const CatalogoContext = createContext(null);
const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/books`;

export function CatalogoProvider({ children }) {
  // GET inicial (autenticado)
  const { datos, cargando, error } = useFetch(BASE_URL, { auth: true });
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    if (!datos) return;

    // Soporta { success, data: { books, total } } o { books, total }
    const payload = datos?.data ?? datos;
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

  // POST alineado con backend (necesita autorId numérico)
  const agregarLibro = useCallback(async ({ titulo, img, autorId, seccion }) => {
    const token = getToken();
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ titulo, img, autorId, seccion }),
    });

    let body;
    try {
      body = await res.json();
    } catch {
      throw new Error(`Error HTTP ${res.status}`);
    }

    // back puede responder {success, message, data: book} o {book, message}
    const creado = body?.data ?? body?.book ?? null;
    if (!res.ok || !creado) {
      throw new Error(body?.message ?? `Error HTTP ${res.status}`);
    }

    const normalizado = {
      id: creado.id ?? creado._id ?? crypto.randomUUID(),
      titulo: creado.titulo ?? "",
      autor: typeof creado.autor === "string" ? creado.autor : (creado.autor?.nombre ?? ""),
      img: creado.img ?? "/Imagenes/placeholder.png",
      seccion: creado.seccion ?? "",
    };

    setCatalogo((prev) => [...prev, normalizado]);
    return normalizado;
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
