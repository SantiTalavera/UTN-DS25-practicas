// src/components/AgregarLibroForm.jsx
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function AgregarLibroForm({ onAgregar }) {
  // 1 estado único con objeto
  const [datosLibro, setDatosLibro] = useState({
    titulo: '',
    autor: '',
    img: 'https://via.placeholder.com/150'  // placeholder por defecto
  })

  // función genérica para actualizar cualquier campo
  const actualizarCampo = (campo, valor) => {
    setDatosLibro({
      ...datosLibro,
      [campo]: valor
    })
  }

  // manejar envío
  const manejarEnvio = (e) => {
    e.preventDefault()
    // 2 llamo al callback que me pasó el padre
    onAgregar({
      id: Date.now(),  // ID único sencillo
      ...datosLibro
    })
    // 3 reseteo formulario
    setDatosLibro({
      titulo: '',
      autor: '',
      img: 'https://via.placeholder.com/150'
    })
  }

  return (
    <Form onSubmit={manejarEnvio} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el título"
          value={datosLibro.titulo}
          onChange={(e) => actualizarCampo('titulo', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el autor"
          value={datosLibro.autor}
          onChange={(e) => actualizarCampo('autor', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL de la portada</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la URL de la imagen"
          value={datosLibro.img}
          onChange={(e) => actualizarCampo('img', e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar Libro
      </Button>
    </Form>
  )
}
