// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/authContext'
import { CatalogoProvider } from './context/CatalogoContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import FilosofosPage from './pages/FilosofosPage'
import RenovadoresPage from './pages/RenovadoresPage'
import DifusoresPage from './pages/DifusoresPage'
import PopularesPage from './pages/PopularesPage'
import RegistrarsePage from './pages/RegistrarsePage'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PrivateRoute } from './components/PrivateRoute'; 

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
              <Route path="/filosofos" element={<FilosofosPage />} />
              <Route path="/renovadores" element={<RenovadoresPage />} />
              <Route path="/difusores" element={<DifusoresPage />} />
              <Route path="/populares" element={<PopularesPage />} />
              <Route path="/registrarse" element={<RegistrarsePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/unauthorized" element={
            <div>
                No tienes permisos para ver esta pagina
            </div> 
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
