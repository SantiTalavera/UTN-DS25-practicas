// src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const items = [
    'Inicio',
    'Filosofos de la antiguedad',
    'Renovadores del Renacimiento',
    'Difusores contemporaneos',
    'Populares en la actualidad',
    'Registrarse',
    'Contacto',
  ]

  return (
    <ul className="nav flex-column">
      {items.map(label => (
        <li key={label} className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            onClick={e => label !== 'Inicio' && e.preventDefault()}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
