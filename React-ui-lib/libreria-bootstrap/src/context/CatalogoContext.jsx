// src/context/CatalogContext.jsx
import React, { createContext, useState } from 'react'
import catalogoInicial from '../data/catalogo'

export const CatalogoContext = createContext()

export function CatalogoProvider({ children }) {
  const [catalogo, setCatalogo] = useState(catalogoInicial) 
  return (
    <CatalogoContext.Provider value={{ catalogo, setCatalogo }}>
      {children}
    </CatalogoContext.Provider>
  )
}
