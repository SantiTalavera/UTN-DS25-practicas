import React from 'react';

export default function BloqueTema({ tituloSeccion, imgSrc, libro, autor, enlace }) {
  return (
    <div className="bloque-tema">
      <h3>{tituloSeccion}</h3>
      <img src={imgSrc} alt={`Portada de ${libro}`} />
      <p><strong>Título:</strong> {libro}</p>
      <p><strong>Autor:</strong> {autor}</p>
      <a href={enlace}>Ver más</a>
    </div>
  );
}
