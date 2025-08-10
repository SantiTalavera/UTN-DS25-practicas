// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { CatalogoProvider } from './context/CatalogoContext'

export default function App() {
  return (
    <BrowserRouter>
      <CatalogoProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </CatalogoProvider>
    </BrowserRouter>
  )
}
