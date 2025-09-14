// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/authContext'
import { CatalogoProvider } from './context/CatalogoContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { ErrorBoundary } from './components/ErrorBoundary'

function Private() {
  const { token, checking } = useAuth()
  if (checking) return <div className="min-vh-100 d-flex align-items-center justify-content-center">Cargando sesión…</div>
  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}

// login sólo si no hay sesión
function LoggedOutOnly() {
  const { token, checking } = useAuth()
  if (checking) return null
  if (token) return <Navigate to="/" replace />
  return <Outlet />
}

function AppShell() {
  return (
    <ErrorBoundary>
      <CatalogoProvider>
        <Layout>
          <Outlet />
        </Layout>
      </CatalogoProvider>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoggedOutOnly />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<Private />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
