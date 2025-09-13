// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './context/authContext'
import { CatalogoProvider } from './context/CatalogoContext'
// App.jsx
function Private({ children }) {
  const { token, checking } = useAuth()
  if (checking) return <div className="p-4">Cargando sesión…</div> // ← visible
  if (!token) return <Navigate to="/login" replace />
  return children
}


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Private>
                  <CatalogoProvider>
                    <HomePage />
                  </CatalogoProvider>
                </Private>
              }
            />
          </Routes>
        </Layout>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  )
}
