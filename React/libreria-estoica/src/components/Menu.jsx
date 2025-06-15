import React from 'react';

const enlaces = [
  { href: '/main.html', texto: 'Inicio' },
  { href: '/fda.html',   texto: 'Filosofos de la antiguedad' },
  { href: '/rdr.html',   texto: 'Renovadores del Renacimiento' },
  { href: '/dc.html',    texto: 'Difusores contemporaneos' },
  { href: '/pa.html',    texto: 'Populares en la actualidad' },
  { href: '/reg.html',   texto: 'Registrarse' },
  { href: '/cont.html',  texto: 'Contacto' },
];

export default function Menu() {
  return (
    <nav id="menu">
      <ul>
        {enlaces.map(({ href, texto }) => (
          <li key={href}>
            <a href={href}>{texto}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
