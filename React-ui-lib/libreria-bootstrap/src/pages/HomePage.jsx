// src/pages/HomePage.jsx
import React from 'react'
import Layout from '../components/Layout'

export default function HomePage() {
  const libros = [
    { titulo: 'Meditaciones', img: '/Imagenes/marcoaurelio.jpg', autor: 'Marco Aurelio' },
    { titulo: 'Ensayos',     img: '/Imagenes/ensayos.jpg',      autor: 'Montaigne' },
    { titulo: 'Pensar...',    img: '/Imagenes/emperor.webp',   autor: 'Robertson' },
    { titulo: 'El obstáculo', img: '/Imagenes/obsway.jpeg',    autor: 'Holiday' },
  ]

  return (
    <Layout>
      <div className="row gx-4 gy-4">
        {libros.map(libro => (
          <div key={libro.titulo} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="bloque-tema">
              <h3>{libro.titulo}</h3>
              <img src={libro.img} alt={libro.titulo} />
              <p><strong>Autor:</strong> {libro.autor}</p>
              <a href="#">Ver más</a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
