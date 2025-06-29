// src/App.jsx
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout       from './components/Layout'
import HomePage     from './pages/HomePage'
import libros from './data/catalogo'

export default function App() {
  const [catalogo, setCatalogo] = useState(libros)
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
           <Route
            path="/"
            element={<HomePage catalogo={catalogo}  setCatalogo={setCatalogo}/>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
