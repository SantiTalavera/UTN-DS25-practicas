// src/components/Layout.jsx
import React from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div id="contenedor" className="container-fluid p-0">
      <div className="row g-0">
        <nav id="menu" className="col-12 col-md-3">
          <Sidebar />
        </nav>

        <div className="col-12 col-md-9">
          <header id="cabecera">
            <img src="/Imagenes/logo.png" alt="Logo" className="logo" />
            <h2>Librería Estoica</h2>
          </header>

          <div id="contenido">
            <div id="principal">
              {children}
            </div>
          </div>
        </div>
      </div>

      <footer id="pie" className="container-fluid">
        <div className="row">
          <div className="col">
            © 2025 Santiago Talavera
          </div>
          <div className="col text-end">
            <a href="#">Términos y Condiciones</a> |
            <a href="#">Política de Privacidad</a> |
            <a href="#">Redes Sociales</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
