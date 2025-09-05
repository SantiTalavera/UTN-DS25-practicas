// src/components/Sidebar.jsx
/*import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ onLinkClick }) {
  const { pathname } = useLocation()
  const [hovered, setHovered] = useState(null)

  const sections = [
    { to: '/',             label: 'Inicio' },
    { to: '/filosofos',    label: 'Filósofos de la antigüedad' },
    { to: '/renovadores',  label: 'Renovadores del Renacimiento' },
    { to: '/difusores',    label: 'Difusores contemporáneos' },
    { to: '/populares',    label: 'Populares en la actualidad' },
    { to: '/registrarse',  label: 'Registrarse' },
    { to: '/contacto',     label: 'Contacto' },
  ]

  const styles = {
    container: {
      backgroundColor: '#E8C39E',
      minHeight: '100vh',
      padding: '1rem'
    },
    link: {
      backgroundColor: '#592E0B',
      color: '#fff',
      fontWeight: 'bold',
      padding: '0.75rem 1rem',
      borderRadius: '4px',
      marginBottom: '0.5rem',
      textDecoration: 'none',
      transition: 'box-shadow 0.2s'
    },
    hover: {
      boxShadow: '0 0 8px rgba(0,0,0,0.7)'
    },
    activeOutline: {
      outline: '2px solid #000'
    }
  }

  return (
    <Nav style={styles.container} className="flex-column">
      {sections.map(({ to, label }) => {
        const isActive  = pathname === to
        const isHovered = hovered === to

        return (
          <Nav.Link
            as={Link}
            to={to}
            key={to}
            onClick={onLinkClick}
            style={{
              ...styles.link,
              ...(isHovered ? styles.hover : {}),
              ...(isActive  ? styles.activeOutline : {})
            }}
            onMouseEnter={() => setHovered(to)}
            onMouseLeave={() => setHovered(null)}
          >
            {label}
          </Nav.Link>
        )
      })}
    </Nav>
  )
}

*/

import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const sections = [
  { to: '/',             label: 'Inicio' },
  { to: '/filosofos',    label: 'Filósofos de la antigüedad' },
  { to: '/renovadores',  label: 'Renovadores del Renacimiento' },
  { to: '/difusores',    label: 'Difusores contemporáneos' },
  { to: '/populares',    label: 'Populares en la actualidad' },
  { to: '/registrarse',  label: 'Registrarse' },
  { to: '/contacto',     label: 'Contacto' },
];

const styles = {
  container: { backgroundColor: '#E8C39E', minHeight: '100vh', padding: '1rem' },
  link:      { backgroundColor: '#592E0B', color: '#fff', fontWeight: 'bold',
               padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '0.5rem',
               textDecoration: 'none', transition: 'box-shadow 0.2s' },
  active:    { outline: '2px solid #000' },
  hover:     { boxShadow: '0 0 8px rgba(0,0,0,0.7)' },
};

export default function Sidebar() {
  return (
    <Nav style={styles.container} className="flex-column">
      {sections.map(({ to, label }) => (
        <Nav.Link
          as={NavLink}
          to={to}
          key={to}
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          {label}
        </Nav.Link>
      ))}
    </Nav>
  );
}
