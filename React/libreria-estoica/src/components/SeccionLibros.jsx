import React from 'react';
import BloqueTema from './BloqueTema';

const datos = [
  {
    tituloSeccion: 'Filosofos de la antiguedad',
    imgSrc: '/Imagenes/marcoaurelio.jpg',
    libro: 'Meditaciones',
    autor: 'Marco Aurelio',
    enlace: '/fda.html'
  },
  {
    tituloSeccion: 'Renovadores del Renacimiento',
    imgSrc: '/Imagenes/ensayos.jpg',
    libro: 'Ensayos',
    autor: 'Michel de Montaigne',
    enlace: '/rdr.html'
  },
  {
    tituloSeccion: 'Difusores Contemporáneos',
    imgSrc: '/Imagenes/emperor.webp',
    libro: 'Pensar como un emperador',
    autor: 'Donald Robertson',
    enlace: '/dc.html'
  },
  {
    tituloSeccion: 'Populares en la Actualidad',
    imgSrc: '/Imagenes/obsway.jpeg',
    libro: 'El obstáculo es el camino',
    autor: 'Ryan Holiday',
    enlace: '/pa.html'
  }
];

export default function SeccionLibros() {
  return (
    <div id="contenido">
      <div id="principal">
        <div className="seccion-libros">
          {datos.map((item) => (
            <BloqueTema key={item.tituloSeccion} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
